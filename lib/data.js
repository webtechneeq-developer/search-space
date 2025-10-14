import "server-only";
import pool from "@/lib/db"; // Import the database connection directly

// Helper function to create a URL-friendly slug
const createSlug = (text) =>
  text ? text.toLowerCase().replace(/ /g, "-") : "";

// UPDATED: This function now queries the database directly
export async function getProperties() {
  try {
    // Fetch all necessary data in parallel
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

    // Combine the data into the structure your components expect
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

      // Find the main image to set as imgSrc
      const mainImage = propertyImages.find((img) => img.isMain)?.name;

      return {
        ...property,
        pricing,
        features,
        images: propertyImages,
        imgSrc: mainImage ? `/uploads/${mainImage}` : null,
        citySlug: createSlug(property.city),
        localitySlug: createSlug(property.subLocation),
        typeSlug: `coworking-${createSlug(property.type)}`, // Assuming 'type' exists on property
      };
    });

    return formattedProperties;
  } catch (error) {
    console.error("Data fetching error (getProperties):", error);
    return []; // Return an empty array on error to prevent the site from crashing
  }
}

// UPDATED: This function now queries the database directly
export async function getLocations() {
  try {
    const [locations] = await pool.query("SELECT * FROM locations");
    return locations;
  } catch (error) {
    console.error("Data fetching error (getLocations):", error);
    return [];
  }
}

// The getDynamicSpaceData function remains the same as it already uses getProperties()
export async function getDynamicSpaceData() {
  const properties = await getProperties();
  const spaceMap = new Map();

  properties.forEach((prop) => {
    if (!Array.isArray(prop.pricing) || !prop.citySlug || !prop.localitySlug) {
      return;
    }
    prop.pricing.forEach((option) => {
      const baseSlug = createSlug(option.type);
      let typeSlug =
        baseSlug === "private-office"
          ? "coworking-office"
          : `coworking-${baseSlug}`;

      if (!typeSlug) return;

      if (!spaceMap.has(typeSlug)) {
        spaceMap.set(typeSlug, { type: typeSlug, cities: {} });
      }
      const space = spaceMap.get(typeSlug);

      if (!space.cities[prop.citySlug]) {
        space.cities[prop.citySlug] = new Set();
      }
      space.cities[prop.citySlug].add(prop.localitySlug);
    });
  });

  const spaceData = [];
  for (const space of spaceMap.values()) {
    const citiesObject = {};
    for (const cityKey in space.cities) {
      citiesObject[cityKey] = Array.from(space.cities[cityKey]);
    }
    space.cities = citiesObject;
    spaceData.push(space);
  }
  return spaceData;
}
