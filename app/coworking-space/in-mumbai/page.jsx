// app/coworking-space/in-mumbai/page.jsx

import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import Banner from "@/components/common/Banner";
import React from "react";
import SeoLinks from "@/components/common/SeoLinks";
import SubLocationGrid from "@/components/common/SubLocationGrid";
import { cities } from "@/data/cities"; // Updated import statement

export const metadata = {
  title:
    "CoWorking Spaces in Mumbai || Homelengo - Real Estate React Nextjs Template",
  description: "Homelengo - Real Estate React Nextjs Template",
};

export default function MumbaiCoworkingPage() {
  const city = "mumbai";
  const cityProperties = cities[city]; // Updated variable name to `cities`

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
