import React from "react";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";
import LocationGrid from "@/components/common/LocationGrid";
import { spaceData } from "@/data/spaces";
import { allProperties } from "@/data/properties";
import SeoLinks from "@/components/common/SeoLinks";
import ReadMore from "@/components/common/ReadMore";

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

  // UPDATED: Check if 'space.cities' exists before getting its keys
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
      <SeoLinks />
      <ReadMore />
      <Footer1 />
    </>
  );
} 