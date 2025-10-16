import { NextResponse } from "next/server";
import pool from "@/lib/db";

const createSlug = (text) =>
  text
    ? text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    : null;

// GET a single property by ID (no changes needed here, but included for completeness)
export async function GET(request, { params }) {
  const { id } = params;
  try {
    const [properties] = await pool.query(
      "SELECT * FROM properties WHERE id = ?",
      [id]
    );
    if (properties.length === 0) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );
    }
    const property = properties[0];

    const [pricing] = await pool.query(
      "SELECT * FROM pricing_options WHERE property_id = ?",
      [id]
    );
    const [images] = await pool.query(
      "SELECT image_name, is_main_image FROM property_images WHERE property_id = ?",
      [id]
    );
    const [featuresResult] = await pool.query(
      `SELECT f.name FROM features f JOIN property_features pf ON f.id = pf.feature_id WHERE pf.property_id = ?`,
      [id]
    );
    const [locationImageResult] = await pool.query(
      'SELECT image_name FROM locations WHERE slug = ? AND type = "locality"',
      [createSlug(property.subLocation)]
    );

    property.pricing = pricing;
    property.images = images.map((img) => ({
      name: img.image_name,
      isMain: !!img.is_main_image,
    }));
    property.features = featuresResult.map((f) => f.name);
    property.locationImage = locationImageResult[0]?.image_name || null;

    return NextResponse.json(property);
  } catch (error) {
    console.error("API GET [id] Error:", error);
    return NextResponse.json(
      { message: "Error fetching property" },
      { status: 500 }
    );
  }
}

// UPDATE a property by ID
export async function PUT(request, { params }) {
  const { id } = params;
  let connection;
  try {
    const { locationImageName, ...property } = await request.json();
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. If a new location image was uploaded, update the locations table
    if (locationImageName) {
      const localitySlug = createSlug(property.subLocation);
      await connection.execute(
        'UPDATE locations SET image_name = ? WHERE slug = ? AND type = "locality"',
        [locationImageName, localitySlug]
      );
    }

    // 2. Update the main `properties` table
    await connection.execute(
      `UPDATE properties SET title=?, slug=?, description=?, city=?, subLocation=?, workingHours=?, 
             lockInPeriod=?, securityDeposit=?, advancePayment=?, noticePeriod=?, map=? WHERE id=?`,
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
        id,
      ]
    );

    // 3. Clear and re-insert all related data for simplicity and accuracy
    await connection.execute(
      "DELETE FROM property_images WHERE property_id = ?",
      [id]
    );
    if (property.images && property.images.length > 0) {
      for (const image of property.images) {
        await connection.execute(
          "INSERT INTO property_images (property_id, image_name, is_main_image) VALUES (?, ?, ?)",
          [id, image.name, image.isMain || false]
        );
      }
    }

    await connection.execute(
      "DELETE FROM pricing_options WHERE property_id = ?",
      [id]
    );
    if (property.pricing && property.pricing.length > 0) {
      for (const option of property.pricing) {
        await connection.execute(
          "INSERT INTO pricing_options (property_id, type, price, unit, seats) VALUES (?, ?, ?, ?, ?)",
          [id, option.type, option.price, option.unit, option.seats || null]
        );
      }
    }

    await connection.execute(
      "DELETE FROM property_features WHERE property_id = ?",
      [id]
    );
    if (property.features && property.features.length > 0) {
      for (const featureName of property.features) {
        let [featureRows] = await connection.execute(
          "SELECT id FROM features WHERE name = ?",
          [featureName]
        );
        let featureId = featureRows[0]?.id;
        if (!featureId) {
          const [newFeature] = await connection.execute(
            "INSERT INTO features (name) VALUES (?)",
            [featureName]
          );
          featureId = newFeature.insertId;
        }
        await connection.execute(
          "INSERT INTO property_features (property_id, feature_id) VALUES (?, ?)",
          [id, featureId]
        );
      }
    }

    await connection.commit();
    return NextResponse.json({ message: "Property updated successfully" });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("API PUT Error:", error);
    return NextResponse.json(
      { message: "Error updating property", error: error.message },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}

// DELETE (soft delete) a property by ID
export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await pool.query("UPDATE properties SET status = 0 WHERE id = ?", [id]);
    return NextResponse.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("API DELETE Error:", error);
    return NextResponse.json(
      { message: "Error deleting property" },
      { status: 500 }
    );
  }
}
