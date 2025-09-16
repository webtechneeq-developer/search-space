// app/[type]/in-[city]/page.jsx
import React from "react";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";
// import Banner from "@/components/common/Banner";
import LocationGrid from "@/components/common/LocationGrid";
import { spaceData } from "@/data/spaces";

export async function generateStaticParams() {
  const params = [];
  spaceData.forEach((space) => {
    for (const city in space.cities) {
      params.push({ type: space.type, city: `in-${city}` });
    }
  });
  return params;
}

export default function CityPage({ params }) {
  const { type, city } = params;
  const cityName = city.replace("in-", "");
  const space = spaceData.find((s) => s.type === type);

  if (!space || !space.cities[cityName]) {
    return <div>Location not found</div>;
  }

  const locations = space.cities[cityName].map((locality) => ({
    name: locality.replace(/-/g, " "),
    url: `/${type}/${cityName}/${locality}`,
    propertyCount: 0, // You can add logic to count properties here
  }));

  return (
    <>
      <Header1 />
      {/* <Banner /> */}
      <LocationGrid
        title={`Localities in ${cityName.replace(/-/g, " ")}`}
        locations={locations}
      />
      <Footer1 />
    </>
  );
}
