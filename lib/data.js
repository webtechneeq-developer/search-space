import "server-only";

// Helper function to create a URL-friendly slug from text
const createSlug = (text) =>
  text ? text.toLowerCase().replace(/ /g, "-") : "";

// This function fetches all properties from your API and is cached automatically by Next.js
export async function getProperties() {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/properties`, {
      next: { tags: ["properties"] }, // Add a tag for on-demand revalidation
    });

    if (!res.ok) {
      throw new Error("Failed to fetch properties from API");
    }

    const properties = await res.json();

    // Add dynamically generated slugs to each property for consistency
    return properties.map((prop) => ({
      ...prop,
      citySlug: createSlug(prop.city),
      localitySlug: createSlug(prop.subLocation),
    }));
  } catch (error) {
    console.error("Data fetching error:", error);
    return [];
  }
}

/**
 * Dynamically builds the entire site's navigation structure.
 * It reads all properties from the database and constructs a hierarchy of:
 * Space Type > City > Localities.
 * This ensures that if you add a property in a new locality (e.g., "Ghatkopar"),
 * it will automatically appear in the website's navigation.
 */
export async function getDynamicSpaceData() {
  const properties = await getProperties();
  const spaceMap = new Map();

  // Loop through every property from the database.
  properties.forEach((prop) => {
    // Skip any property that is missing essential data.
    if (!Array.isArray(prop.pricing) || !prop.citySlug || !prop.localitySlug) {
      return;
    }

    // A single property can offer multiple space types (e.g., Private Office, Day Pass).
    // We iterate through each pricing option to create a navigation path for it.
    prop.pricing.forEach((option) => {
      const baseSlug = createSlug(option.type);
      let typeSlug;

      // This logic creates the URL slugs for your co-working types.
      // Example: "Dedicated Desk" becomes "coworking-dedicated-desk"
      if (baseSlug === "private-office") {
        typeSlug = "coworking-office";
      } else {
        typeSlug = `coworking-${baseSlug}`;
      }

      if (!typeSlug) return;

      // If we haven't seen this space type before, add it to our map.
      if (!spaceMap.has(typeSlug)) {
        spaceMap.set(typeSlug, { type: typeSlug, cities: {} });
      }
      const space = spaceMap.get(typeSlug);

      // If we haven't seen this city for this space type before, add it.
      if (!space.cities[prop.citySlug]) {
        space.cities[prop.citySlug] = new Set();
      }

      // Add the locality to the Set for this city.
      // A Set automatically handles duplicates, so "andheri" will only be added once.
      space.cities[prop.citySlug].add(prop.localitySlug);
    });
  });

  // Convert the map structure back to the array format that your pages expect.
  const spaceData = [];
  for (const space of spaceMap.values()) {
    const citiesObject = {};
    for (const cityKey in space.cities) {
      // Convert the Set of localities back into a simple array.
      citiesObject[cityKey] = Array.from(space.cities[cityKey]);
    }
    space.cities = citiesObject;
    spaceData.push(space);
  }

  return spaceData;
}
