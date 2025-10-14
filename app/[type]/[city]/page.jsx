import React from "react";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";
import LocationGrid from "@/components/common/LocationGrid";
import { getProperties, getLocations } from "@/lib/data"; // Use all data fetching functions

export async function generateStaticParams() {
  // Dynamically generate paths based on actual property data
  const allProperties = await getProperties();
  const uniquePaths = new Set();

  allProperties.forEach((property) => {
    // A single property can be available under multiple types via its pricing options
    property.pricing.forEach((option) => {
      const typeSlug = option.type
        .toLowerCase()
        .replace(/ /g, "-")
        .replace("private-office", "coworking-office")
        .replace(/^/, "coworking-");
      if (typeSlug && property.citySlug) {
        uniquePaths.add(`${typeSlug}/${property.citySlug}`);
      }
    });
  });

  return Array.from(uniquePaths).map((path) => {
    const [type, city] = path.split("/");
    return { type, city };
  });
}

function capitalizeWords(str) {
  if (!str) return "";
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function CityPage({ params }) {
  const { type, city: cityKey } = params;

  // 1. Fetch all necessary data from the database in parallel
  const [allProperties, allLocations] = await Promise.all([
    getProperties(),
    getLocations(),
  ]);

  // 2. Filter properties for the current city
  const propertiesInCity = allProperties.filter((p) => p.citySlug === cityKey);

  // 3. Dynamically find all unique localities from the properties in this city
  const localities = [...new Set(propertiesInCity.map((p) => p.localitySlug))];

  if (!localities || localities.length === 0) {
    return (
      <>
        <Header1 />
        <div className="container text-center" style={{ padding: "100px 0" }}>
          <h2>No Localities Found</h2>
          <p className="lead text-muted">
            We have no listings in {capitalizeWords(cityKey)} for this space
            type yet.
          </p>
        </div>
        <Footer1 />
      </>
    );
  }

  // 4. Map over the dynamically found localities to create the data for the grid
  const locations = localities.map((localitySlug) => {
    const propertyCount = propertiesInCity.filter(
      (property) => property.localitySlug === localitySlug
    ).length;

    // Find the specific locality in the locations table to get its image
    const localityInfo = allLocations.find(
      (loc) => loc.slug === localitySlug && loc.type === "locality"
    );

    // Construct the image URL from the database record
    const image = localityInfo?.image_name
      ? `/uploads/cities/${localityInfo.image_name}`
      : "/images/cities/default-city.webp"; // Fallback image

    return {
      name: capitalizeWords(localitySlug),
      url: `/${type}/${cityKey}/${localitySlug}`,
      propertyCount,
      image,
    };
  });

  return (
    <>
      <Header1 />
      <LocationGrid
        title={`Localities in ${capitalizeWords(cityKey)} for ${capitalizeWords(
          type
        )}`}
        locations={locations}
      />
      <Footer1 />
    </>
  );
}
