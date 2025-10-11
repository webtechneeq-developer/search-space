import React from "react";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";
import LocationGrid from "@/components/common/LocationGrid";
import { getProperties } from "@/lib/data"; // Use the dynamic data fetching function

// This function can now also be made dynamic, but for now we'll keep it simple
export async function generateStaticParams() {
  const allProperties = await getProperties();
  const uniquePaths = new Set();
  allProperties.forEach((p) => {
    if (p.typeSlug && p.citySlug) {
      uniquePaths.add(`${p.typeSlug}/${p.citySlug}`);
    }
  });
  return Array.from(uniquePaths).map((path) => {
    const [type, city] = path.split("/");
    return { type, city };
  });
}

// Helper function to format text for display
function capitalizeWords(str) {
  if (!str) return "";
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// This page is now fully dynamic
export default async function CityPage({ params }) {
  const { type, city: cityKey } = params;

  // Fetch all properties from your database
  const allProperties = await getProperties();

  // Filter properties to get only those in the current city
  const propertiesInCity = allProperties.filter((p) => p.citySlug === cityKey);

  // THIS IS THE FIX: Dynamically find all unique localities from the database results
  // instead of using the static spaceData.js file.
  const localities = [...new Set(propertiesInCity.map((p) => p.localitySlug))];

  if (!localities || localities.length === 0) {
    return <div>No localities found for this city.</div>;
  }

  // Map over the dynamically found localities to create the links
  const locations = localities.map((locality) => {
    const propertyCount = propertiesInCity.filter(
      (property) => property.localitySlug === locality
    ).length;

    const firstPropInLocality = propertiesInCity.find(
      (p) => p.localitySlug === locality
    );
    const image =
      firstPropInLocality?.imgSrc || "/images/cities/default-city.webp";

    return {
      name: capitalizeWords(locality),
      url: `/${type}/${cityKey}/${locality}`,
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
