import React from "react";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";
import CityPageLayout from "@/components/common/CityPageLayout";
import { properties } from "@/data/properties";

export default function MumbaiPage() {
  // Get all properties for Mumbai
  const initialProperties = properties.mumbai || [];

  // Get a unique list of localities for the filter dropdown
  const localities = [...new Set(initialProperties.map((p) => p.subLocation))];

  return (
    <>
      <Header1 />
      <CityPageLayout
        initialProperties={initialProperties}
        localities={localities}
        cityName="Mumbai"
      />
      <Footer1 />
    </>
  );
}
