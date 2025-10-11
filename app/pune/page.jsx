import React from "react";
import Header1 from "../../components/headers/Header1";
import Footer1 from "../../components/footer/Footer1";
import CityPageLayout from "../../components/common/CityPageLayout";
import { getProperties } from "../../lib/data"; // Use the dynamic data fetching function
import ReadMore from "../../components/common/ReadMore";
import SeoLinks from "../../components/common/SeoLinks";

// Convert the component to an async function to fetch data
export default async function PunePage() {
  // Fetch all properties from the database via the API
  const allProperties = await getProperties();

  // Filter for Pune properties on the server
  const initialProperties =
    allProperties.filter((p) => p.city === "Pune") || [];

  // Get a unique list of localities for the filter dropdown
  const localities = [...new Set(initialProperties.map((p) => p.subLocation))];

  return (
    <>
      <Header1 />
      <CityPageLayout
        initialProperties={initialProperties}
        localities={localities}
        cityName="Pune"
      />
      <SeoLinks />
      <ReadMore />
      <Footer1 />
    </>
  );
}
