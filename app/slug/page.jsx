// app/[slug]/page.jsx

import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import Banner from "@/components/common/Banner";
import React from "react";
import SeoLinks from "@/components/common/SeoLinks";
import SubLocationGrid from "@/components/common/SubLocationGrid";
import { properties } from "@/data/demoProporties";

export const metadata = {
  title:
    "CoWorking Spaces in Mumbai || Homelengo - Real Estate React Nextjs Template",
  description: "Homelengo - Real Estate React Nextjs Template",
};

export default function DynamicPage({ params }) {
  const { slug } = params;

  // Split the slug to extract the city name
  // This will handle slugs like "coworking-space-in-mumbai"
  const slugParts = slug.split("-");
  const city = slugParts[slugParts.length - 1];

  const cityProperties = properties[city];

  if (!cityProperties) {
    return <div>No coworking spaces found for {city}.</div>;
  }

  const subLocations = cityProperties.reduce((acc, property) => {
    const subLocationSlug = property.subLocation
      .replace(" ", "-")
      .toLowerCase();
    if (!acc[subLocationSlug]) {
      acc[subLocationSlug] = {
        listings: [],
      };
    }
    acc[subLocationSlug].listings.push(property);
    return acc;
  }, {});

  return (
    <>
      <Header1 />
      <Banner />
      <SubLocationGrid locations={subLocations} city={city} />
      <SeoLinks />
      <Footer1 />
    </>
  );
}
