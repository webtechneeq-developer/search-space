// app/[location]/[sublocation]/page.jsx
import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import Properties3 from "@/components/properties/Properties3";
import React, { Suspense } from "react";
import { properties } from "@/data/demoProporties";

export async function generateMetadata({ params }) {
  const { location, sublocation } = params;
  const cityTitle = location.charAt(0).toUpperCase() + location.slice(1);
  const sublocationTitle =
    sublocation.charAt(0).toUpperCase() + sublocation.slice(1);
  return {
    title: `${sublocationTitle} Properties in ${cityTitle} || Homelengo`,
    description: `Explore properties in the ${sublocationTitle} neighborhood of ${cityTitle}.`,
  };
}

export default function SubLocationPage({ params }) {
  const { location, sublocation } = params;

  // Get all properties for the city
  const cityProperties = properties[location] || [];

  // Filter those properties for the specific sub-location
  const filteredProperties = cityProperties.filter(
    (p) =>
      p.subLocation.toLowerCase().replace(/ /g, "-") ===
      sublocation.toLowerCase()
  );

  return (
    <>
      <Suspense fallback={<div>Loading properties...</div>}>
        <Header1 />
        {/* Pass the filtered sub-location properties to Properties3 */}
        <Properties3 propertiesData={filteredProperties} />
        <Footer1 />
      </Suspense>
    </>
  );
}
