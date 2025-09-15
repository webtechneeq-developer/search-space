// app/coworking-space/in-mumbai/page.jsx

import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import Banner from "@/components/common/Banner";
import React from "react";
import SeoLinks from "@/components/common/SeoLinks";
import Properties3 from "@/components/properties/Properties3"; // Use Properties3 component
import { properties } from "@/data/demoProporties"; // Use the main properties dataset

export const metadata = {
  title:
    "CoWorking Spaces in Mumbai || Homelengo - Real Estate React Nextjs Template",
  description: "Homelengo - Real Estate React Nextjs Template",
};

export default function MumbaiCoworkingPage() {
  const city = "mumbai";
  // Get all properties related to Mumbai
  const mumbaiProperties = properties[city];

  if (!mumbaiProperties) {
    return <div>No coworking spaces found for {city}.</div>;
  }

  return (
    <>
      <Header1 />
      <Banner />
      {/* Pass the Mumbai properties to Properties3 */}
      <Properties3 propertiesData={mumbaiProperties} />
      <SeoLinks />
      <Footer1 />
    </>
  );
}
