import React from "react";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";
import CityPageLayout from "@/components/common/CityPageLayout";
import { getProperties } from "@/lib/data"; // Use the dynamic data fetching function
import ReadMore from "@/components/common/ReadMore";
import SeoLinks from "@/components/common/SeoLinks";

// Convert the component to an async function to fetch data on the server
export default async function MumbaiPage() {
  // Fetch all properties from the database via the API
  const allProperties = await getProperties();

  // Filter for Mumbai properties, making the comparison case-insensitive for robustness
  const initialProperties =
    allProperties.filter((p) => p.city?.toLowerCase() === "mumbai") || [];

  // Get a unique list of all localities within the filtered Mumbai properties
  const localities = [...new Set(initialProperties.map((p) => p.subLocation))];

  return (
    <>
      <Header1 />
      <CityPageLayout
        initialProperties={initialProperties}
        localities={localities}
        cityName="Mumbai"
      />
      <SeoLinks />
      <ReadMore />
      <Footer1 />
    </>
  );
}
