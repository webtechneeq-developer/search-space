// This is a standalone Node.js script to migrate your data.
// Run it from your terminal with: node seed.js

const mysql = require("mysql2/promise");
const { allProperties } = require("./data/properties.js");

// --- DATABASE CONFIGURATION ---
// Load environment variables from .env.local
require("dotenv").config({ path: "./.env.local" });

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};
// -----------------------------

async function seedDatabase() {
  let connection;
  try {
    // Connect to the database
    connection = await mysql.createConnection(dbConfig);
    console.log("✅ Connected to MySQL database.");

    // --- 1. Seed Features ---
    console.log("\nSeeding features...");
    // Get a unique list of all features from all properties
    const allFeatures = [...new Set(allProperties.flatMap((p) => p.features))];

    // Insert each feature into the `features` table. IGNORE duplicates.
    for (const featureName of allFeatures) {
      await connection.execute(
        "INSERT IGNORE INTO features (name) VALUES (?)",
        [featureName]
      );
    }
    console.log(`✅ Found and inserted ${allFeatures.length} unique features.`);

    // Fetch the newly created features with their IDs
    const [featureRows] = await connection.execute("SELECT * FROM features");
    const featureMap = new Map(featureRows.map((f) => [f.name, f.id]));

    // --- 2. Seed Properties, Pricing, and Property-Features ---
    console.log("\nSeeding properties and their related data...");
    for (const property of allProperties) {
      // Insert into the main `properties` table
      const [propertyResult] = await connection.execute(
        `INSERT INTO properties (id, title, slug, description, city, subLocation, workingHours, lockInPeriod, securityDeposit, advancePayment, noticePeriod, imgSrc, map, status) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          property.id,
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
          1, // Default status to active
        ]
      );

      const newPropertyId = propertyResult.insertId;
      console.log(
        `  -> Inserted property: ${property.title} (ID: ${newPropertyId})`
      );

      // Insert into `pricing_options` for this property
      for (const priceOption of property.pricing) {
        await connection.execute(
          "INSERT INTO pricing_options (property_id, type, price, unit, seats) VALUES (?, ?, ?, ?, ?)",
          [
            newPropertyId,
            priceOption.type,
            priceOption.price,
            priceOption.unit,
            priceOption.seats,
          ]
        );
      }
      console.log(
        `     - Inserted ${property.pricing.length} pricing options.`
      );

      // Link features to this property in `property_features`
      for (const featureName of property.features) {
        const featureId = featureMap.get(featureName);
        if (featureId) {
          await connection.execute(
            "INSERT INTO property_features (property_id, feature_id) VALUES (?, ?)",
            [newPropertyId, featureId]
          );
        }
      }
      console.log(`     - Linked ${property.features.length} features.`);
    }

    console.log("\n🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    if (connection) {
      await connection.end();
      console.log("\nDisconnected from database.");
    }
  }
}

// Run the function
seedDatabase();
