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

  // Each city - count total properties inside all its sublocations for this type
  const locations = Object.entries(space.cities).map(
    ([cityKey, subLocations]) => {
      const propertyCount = allProperties.filter(
        (property) =>
          property.typeSlug === type &&
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
