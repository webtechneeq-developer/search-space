// app/slug/page.jsx

import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import Banner from "@/components/common/Banner";
import React from "react";
import SeoLinks from "@/components/common/SeoLinks";
import Properties3 from "@/components/properties/Properties3"; // Using Properties3 as a fallback/generic component
import { allProperties, properties } from "@/data/demoProporties";

export const metadata = {
  title:
    "Dynamic Content Page || Homelengo - Real Estate React Nextjs Template",
  description: "Homelengo - Real Estate React Nextjs Template",
};

export default function DynamicPage({ params }) {
  const { slug } = params;

  // Let's create a simple filtering logic based on the slug
  const filteredData = allProperties.filter(
    (prop) =>
      prop.subLocation?.toLowerCase().replace(/ /g, "-") === slug ||
      prop.city?.toLowerCase().replace(/ /g, "-") === slug
  );

  return (
    <>
      <Header1 />
      <Banner />
      {filteredData.length > 0 ? (
        <Properties3 propertiesData={filteredData} />
      ) : (
        <div>No matching content found.</div>
      )}
      <SeoLinks />
      <Footer1 />
    </>
  );
}
