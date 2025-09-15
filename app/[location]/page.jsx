// app/[location]/page.jsx
import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import Properties3 from "@/components/properties/Properties3";
import React, { Suspense } from "react";
import { properties } from "@/data/demoProporties";

export async function generateMetadata({ params }) {
  const { location } = params;
  const cityTitle = location.charAt(0).toUpperCase() + location.slice(1);
  return {
    title: `${cityTitle} Properties || Homelengo - Real Estate Nextjs Template`,
    description: `Browse all properties in ${cityTitle}.`,
  };
}

export default function LocationPage({ params }) {
  const { location } = params;
  const cityProperties = properties[location] || [];

  return (
    <>
      <Suspense fallback={<div>Loading properties...</div>}>
        <Header1 />
        {/* Pass all properties for the city to Properties3 */}
        <Properties3 propertiesData={cityProperties} />
        <Footer1 />
      </Suspense>
    </>
  );
}
