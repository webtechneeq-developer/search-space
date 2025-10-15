import React from "react";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";
import LocationGrid from "@/components/common/LocationGrid";
import { getProperties, getDynamicSpaceData, getLocations } from "@/lib/data"; // Use all data fetching functions
import SeoLinks from "@/components/common/SeoLinks";
import Readmore from "@/components/common/ReadMore";

// This function tells Next.js which pages to pre-build based on your data.
export async function generateStaticParams() {
  const spaceData = await getDynamicSpaceData();
  // It will create a page for each space type defined in your spaceData.
  return spaceData.map((space) => ({
    type: space.type,
  }));
}

// Helper function to format text for display (e.g., "navi-mumbai" -> "Navi Mumbai")
function capitalizeWords(str) {
  if (!str) return "";
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Make the component async to fetch data on the server
export default async function SpaceTypePage({ params }) {
  const { type } = params;

  // Fetch all necessary data from the database in parallel
  const [allProperties, allLocations, spaceData] = await Promise.all([
    getProperties(),
    getLocations(),
    getDynamicSpaceData(),
  ]);

  // Find the structural information for the current space type from your dynamic data
  const space = spaceData.find((s) => s.type === type);

  if (!space || !space.cities || Object.keys(space.cities).length === 0) {
    return (
      <>
        <Header1 />
        <div className="container text-center" style={{ padding: "100px 0" }}>
          <h2>No Cities Available</h2>
          <p className="lead text-muted">
            We are working on adding new locations for {capitalizeWords(type)}.
            Please check back soon!
          </p>
        </div>
        <Footer1 />
      </>
    );
  }

  // Process the cities for the current space type to display them
  const locations = Object.entries(space.cities).map(
    ([cityKey, subLocations]) => {
      // For each city, count how many properties from the database match it
      const propertyCount = allProperties.filter(
        (property) => property.citySlug === cityKey
      ).length;

      // Find the specific city in the locations table to get its image
      const locationInfo = allLocations.find(
        (loc) => loc.slug === cityKey && loc.type === "city"
      );

      // Construct the image URL from the database record
      const image = locationInfo?.image_name
        ? `/uploads/${locationInfo.image_name}`
        : "/images/cities/default-city.webp"; // Fallback image

      return {
        name: capitalizeWords(cityKey),
        url: `/${type}/${cityKey}`, // The URL to the next page in the hierarchy
        propertyCount,
        image, // Pass the dynamically fetched image to the LocationGrid
      };
    }
  );

  return (
    <>
      <Header1 />
      <LocationGrid
        title={`Find Best ${capitalizeWords(type)}`}
        locations={locations}
      />
      <SeoLinks />
      <Readmore />
      <Footer1 />
    </>
  );
}
