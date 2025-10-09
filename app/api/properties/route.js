import { NextResponse } from "next/server";
import pool from "@/lib/db"; // Import our database connection

// This function handles GET requests to /api/properties
export async function GET(request) {
  try {
    // We'll run a few queries to reconstruct the data structure
    const [properties] = await pool.query(
      "SELECT * FROM properties WHERE status = 1"
    );
    const [pricingOptions] = await pool.query("SELECT * FROM pricing_options");
    const [propertyFeatures] = await pool.query(`
      SELECT pf.property_id, f.name 
      FROM property_features pf 
      JOIN features f ON pf.feature_id = f.id
    `);

    // Now, let's shape the data to match the original JavaScript object structure
    const formattedProperties = properties.map((property) => {
      // Find all pricing options for the current property
      const pricing = pricingOptions.filter(
        (p) => p.property_id === property.id
      );

      // Find all features for the current property
      const features = propertyFeatures
        .filter((f) => f.property_id === property.id)
        .map((f) => f.name);

      return {
        ...property,
        pricing,
        features,
      };
    });

    return NextResponse.json(formattedProperties);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Error fetching properties" },
      { status: 500 }
    );
  }
}
// ADD THIS NEW POST FUNCTION
export async function POST(request) {
  let connection;
  try {
    const property = await request.json();
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. Insert into the main `properties` table (without imgSrc)
    const [propertyResult] = await connection.execute(
      `INSERT INTO properties (title, slug, description, city, subLocation, workingHours, lockInPeriod, securityDeposit, advancePayment, noticePeriod, map, status) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [
        property.title,
        property.slug,
        property.description,
        property.city,
        property.subLocation,
        property.workingHours,
        property.lockInPeriod,
        property.securityDeposit,
        property.advancePayment,
        property.noticePeriod,
        property.map,
      ]
    );
    const newPropertyId = propertyResult.insertId;

    // 2. Insert into the new `property_images` table
    if (property.images && property.images.length > 0) {
      for (const image of property.images) {
        await connection.execute(
          "INSERT INTO property_images (property_id, image_name, is_main_image) VALUES (?, ?, ?)",
          [newPropertyId, image.name, image.isMain || false]
        );
      }
    }

    // ... (Pricing and Features insertion logic remains the same) ...

    await connection.commit();
    return NextResponse.json(
      { message: "Property created successfully", id: newPropertyId },
      { status: 201 }
    );
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Error creating property", error: error.message },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}
