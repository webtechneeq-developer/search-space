// app/[type]/page.jsx
import React from "react";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";
// import Banner from "@/components/common/Banner";
import LocationGrid from "@/components/common/LocationGrid";
import { spaceData } from "@/data/spaces";

export async function generateStaticParams() {
  return spaceData.map((space) => ({
    type: space.type,
  }));
}

export default function SpaceTypePage({ params }) {
  const { type } = params;
  const space = spaceData.find((s) => s.type === type);

  if (!space) {
    return <div>Type not found</div>;
  }

  const locations = Object.keys(space.cities).map((city) => ({
    name: city.replace(/-/g, " "),
    url: `/${type}/${city}`,
    propertyCount: space.cities[city].length, // Or you can count actual properties
  }));

  return (
    <>
      <Header1 />
      {/* <Banner /> */}
      <LocationGrid
        title={`Available Cities for ${type.replace(/-/g, " ")}`}
        locations={locations}
      />
      <Footer1 />
    </>
  );
}
