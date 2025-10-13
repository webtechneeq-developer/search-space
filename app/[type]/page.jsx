import React from "react";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";
import LocationGrid from "@/components/common/LocationGrid";
import { spaceData } from "@/data/spaces";
import { getProperties } from "@/lib/data"; // Use the dynamic data fetching function
import SeoLinks from "@/components/common/SeoLinks";
import Readmore from "@/components/common/ReadMore";

// This function tells Next.js which pages to pre-build based on your data.
export async function generateStaticParams() {
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

  // Fetch all properties from your database
  const allProperties = await getProperties();

  // Find the structural information for the current space type from your static data
  const space = spaceData.find((s) => s.type === type);

  if (!space) {
    // This should ideally not be reached if generateStaticParams is correct
    return <div>Type not found</div>;
  }

  // Handle cases where a space type is defined but has no cities assigned yet
  if (!space.cities || Object.keys(space.cities).length === 0) {
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
        (property) =>
          // Match the city (e.g., "Navi Mumbai" becomes "navi-mumbai" to match the key)
          property.city.toLowerCase().replace(/ /g, "-") === cityKey &&
          // Ensure the property's sublocation is valid for this space type and city
          subLocations.includes(property.subLocation.toLowerCase())
      ).length;

      return {
        name: capitalizeWords(cityKey),
        url: `/${type}/${cityKey}`, // The URL to the next page in the hierarchy
        propertyCount,
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
      {/* <SeoLinks /> */}
      <SeoLinks />
      <Readmore />
      <Footer1 />
    </>
  );
}
