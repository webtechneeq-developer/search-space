import React from "react";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";
import LocationGrid from "@/components/common/LocationGrid";
import { spaceData } from "@/data/spaces";
import { allProperties } from "@/data/properties"; // Make sure to import this

export async function generateStaticParams() {
  const params = [];
  spaceData.forEach((space) => {
    for (const city in space.cities) {
      params.push({ type: space.type, city: `in-${city}` });
    }
  });
  return params;
}

function capitalizeWords(str) {
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function CityPage({ params }) {
  const { type, city } = params;
  const cityName = city.replace("in-", "");
  const space = spaceData.find((s) => s.type === type);

  if (!space || !space.cities[cityName]) {
    return <div>Location not found</div>;
  }

  const localities = space.cities[cityName];

  const locations = localities.map((locality) => {
    // Count properties matching type and subLocation
    const propertyCount = allProperties.filter(
      (property) =>
        property.typeSlug === type &&
        property.citySlug === cityName &&
        property.subLocation.toLowerCase() === locality.toLowerCase()
    ).length;

    return {
      name: capitalizeWords(locality),
      url: `/${type}/${cityName}/${locality}`,
      propertyCount,
    };
  });

  return (
    <>
      <Header1 />
      <LocationGrid
        title={`Localities in ${capitalizeWords(
          cityName
        )} for ${capitalizeWords(type)}`}
        locations={locations}
      />
      <Footer1 />
    </>
  );
}
