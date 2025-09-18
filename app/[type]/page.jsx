// app/[type]/page.jsx
import React from "react";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";
import LocationGrid from "@/components/common/LocationGrid";
import { spaceData } from "@/data/spaces";
import { allProperties } from "@/data/properties";

function capitalizeWords(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function SpaceTypePage({ params }) {
  const { type } = params;
  const space = spaceData.find((s) => s.type === type);

  if (!space) {
    return <div>Type not found</div>;
  }

  // Check if there are any cities for this space type
  if (Object.keys(space.cities).length === 0) {
    return (
      <>
        <Header1 />
        <div className="container text-center" style={{ padding: "100px 0" }}>
          <h3>No Cities Available</h3>
          <p className="lead text-muted my-4">
            We are working on adding new locations for {capitalizeWords(type)}.
            Please check back soon!
          </p>
        </div>
        <Footer1 />
      </>
    );
  }

  // If cities exist, proceed with the original logic
  const locations = Object.entries(space.cities).map(
    ([cityKey, subLocations]) => {
      const propertyCount = allProperties.filter(
        (property) =>
          property.citySlug === cityKey &&
          subLocations.includes(property.subLocation.toLowerCase())
      ).length;

      return {
        name: capitalizeWords(cityKey),
        url: `/${type}/${cityKey}`,
        propertyCount,
      };
    }
  );

  return (
    <>
      <Header1 />
      <LocationGrid
        title={`Available Cities for ${capitalizeWords(type)}`}
        locations={locations}
      />
      <Footer1 />
    </>
  );
}
