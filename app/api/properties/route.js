import { NextResponse } from "next/server";
import pool from "@/lib/db";

const createSlug = (text) =>
  text
    ? text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    : null;

// This helper function finds a location or creates it if it doesn't exist.
// It now also accepts an optional imageName.
async function findOrCreateLocation(
  connection,
  { name, type, parent_id = null, imageName = null }
) {
  if (!name) return null;
  const slug = createSlug(name);

  // Check if the location already exists
  const [rows] = await connection.execute(
    "SELECT id FROM locations WHERE slug = ? AND type = ?",
    [slug, type]
  );

  if (rows.length > 0) {
    return rows[0].id; // Return existing ID
  }

  // If it's a new location, insert it with the provided image name
  const [result] = await connection.execute(
    "INSERT INTO locations (name, slug, type, parent_id, image_name) VALUES (?, ?, ?, ?, ?)",
    [name, slug, type, parent_id, imageName]
  );
  return result.insertId;
}

// This function handles GET requests to /api/properties
export async function GET(request) {
  try {
    const [properties] = await pool.query(
      "SELECT * FROM properties WHERE status = 1"
    );
    const [pricingOptions] = await pool.query("SELECT * FROM pricing_options");
    const [propertyFeatures] = await pool.query(`
      SELECT pf.property_id, f.name 
      FROM property_features pf 
      JOIN features f ON pf.feature_id = f.id
    `);
    const [images] = await pool.query("SELECT * FROM property_images");

    // Shape the data to match the structure your components expect
    const formattedProperties = properties.map((property) => {
      const pricing = pricingOptions.filter(
        (p) => p.property_id === property.id
      );
      const features = propertyFeatures
        .filter((f) => f.property_id === property.id)
        .map((f) => f.name);
      const propertyImages = images
        .filter((img) => img.property_id === property.id)
        .map((img) => ({
          name: img.image_name,
          isMain: !!img.is_main_image,
        }));
      const mainImage = propertyImages.find((img) => img.isMain)?.name;

      return {
        ...property,
        pricing,
        features,
        images: propertyImages,
        imgSrc: mainImage ? `/uploads/${mainImage}` : null,
        citySlug: createSlug(property.city),
        localitySlug: createSlug(property.subLocation),
      };
    });

    return NextResponse.json(formattedProperties);
  } catch (error) {
    console.error("API GET Error:", error);
    return NextResponse.json(
      { message: "Error fetching properties" },
      { status: 500 }
    );
  }
}

// This function handles POST requests to create a new property
export async function POST(request) {
  let connection;
  try {
    const { locationImageName, ...propertyData } = await request.json();

    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. Find or Create City and Locality in the 'locations' table
    const cityId = await findOrCreateLocation(connection, {
      name: propertyData.city,
      type: "city",
      imageName: locationImageName,
    });
    if (!cityId) throw new Error("City is required.");

    await findOrCreateLocation(connection, {
      name: propertyData.subLocation,
      type: "locality",
      parent_id: cityId,
      imageName: locationImageName,
    });

    // 2. Insert the main property data
    const [propertyResult] = await connection.execute(
      `INSERT INTO properties (title, slug, description, city, subLocation, workingHours, lockInPeriod, securityDeposit, advancePayment, noticePeriod, map, status) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [
        propertyData.title,
        propertyData.slug,
        propertyData.description,
        propertyData.city,
        propertyData.subLocation,
        propertyData.workingHours,
        propertyData.lockInPeriod,
        propertyData.securityDeposit,
        propertyData.advancePayment,
        propertyData.noticePeriod,
        propertyData.map,
      ]
    );
    const newPropertyId = propertyResult.insertId;

    // 3. Insert the pricing options
    if (propertyData.pricing && propertyData.pricing.length > 0) {
      for (const priceOption of propertyData.pricing) {
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
    }

    // 4. Insert property images
    if (propertyData.images && propertyData.images.length > 0) {
      for (const image of propertyData.images) {
        await connection.execute(
          "INSERT INTO property_images (property_id, image_name, is_main_image) VALUES (?, ?, ?)",
          [newPropertyId, image.name, image.isMain || false]
        );
      }
    }

    // 5. Link features in the join table
    if (propertyData.features && propertyData.features.length > 0) {
      for (const featureName of propertyData.features) {
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
        await connection.execute(
          "INSERT INTO property_features (property_id, feature_id) VALUES (?, ?)",
          [newPropertyId, featureId]
        );
      }
    }

    await connection.commit();
    return NextResponse.json(
      { message: "Property created successfully", id: newPropertyId },
      { status: 201 }
    );
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("API POST Error:", error);
    return NextResponse.json(
      { message: "Error creating property", error: error.message },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}
