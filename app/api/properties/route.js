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

    // Start a database transaction
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. Insert into the main `properties` table
    const [propertyResult] = await connection.execute(
      `INSERT INTO properties (title, slug, description, city, subLocation, workingHours, lockInPeriod, securityDeposit, advancePayment, noticePeriod, imgSrc, map, status) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
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
        property.imgSrc,
        property.map,
      ]
    );
    const newPropertyId = propertyResult.insertId;

    // 2. Insert into `pricing_options`
    for (const priceOption of property.pricing) {
      await connection.execute(
        "INSERT INTO pricing_options (property_id, type, price, unit, seats) VALUES (?, ?, ?, ?, ?)",
        [
          newPropertyId,
          priceOption.type,
          priceOption.price,
          priceOption.unit,
          priceOption.seats || null,
        ]
      );
    }

    // 3. Link features in `property_features`
    for (const featureName of property.features) {
      // Find the feature's ID. If it doesn't exist, create it.
      let [featureRows] = await connection.execute(
        "SELECT id FROM features WHERE name = ?",
        [featureName]
      );
      let featureId;
      if (featureRows.length > 0) {
        featureId = featureRows[0].id;
      } else {
        const [newFeatureResult] = await connection.execute(
          "INSERT INTO features (name) VALUES (?)",
          [featureName]
        );
        featureId = newFeatureResult.insertId;
      }
      // Link the property and feature
      await connection.execute(
        "INSERT INTO property_features (property_id, feature_id) VALUES (?, ?)",
        [newPropertyId, featureId]
      );
    }

    // If all queries were successful, commit the transaction
    await connection.commit();

    return NextResponse.json(
      { message: "Property created successfully", id: newPropertyId },
      { status: 201 }
    );
  } catch (error) {
    // If any query fails, roll back the transaction
    if (connection) await connection.rollback();
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Error creating property", error: error.message },
      { status: 500 }
    );
  } finally {
    // Always release the connection back to the pool
    if (connection) connection.release();
  }
}
