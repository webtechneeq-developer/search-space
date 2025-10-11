import React, { Suspense } from "react";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";
import LocalityPageContent from "@/components/common/LocalityPageContent";
import { getProperties } from "@/lib/data"; // Use the dynamic data fetching function

// This function tells Next.js which pages to pre-build based on live data
export async function generateStaticParams() {
  const allProperties = await getProperties();
  const params = [];
  const uniquePaths = new Set();

  allProperties.forEach((property) => {
    // Ensure all necessary slugs exist to create a valid path
    if (property.typeSlug && property.citySlug && property.localitySlug) {
      const path = `${property.typeSlug}/${property.citySlug}/${property.localitySlug}`;
      if (!uniquePaths.has(path)) {
        uniquePaths.add(path);
        params.push({
          type: property.typeSlug,
          city: property.citySlug,
          locality: property.localitySlug,
        });
      }
    }
  });

  return params;
}

// This Server Component fetches the initial data for the page
export default async function LocalityPage({ params }) {
  const { type, locality } = params;

  // Fetch all properties from the database
  const allProperties = await getProperties();

  // Filter properties on the server to get only those for this specific locality
  const initialProperties = allProperties.filter(
    (p) => p.localitySlug === locality
  );

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header1 />
        {/* Pass the server-fetched data as props to the interactive client component */}
        <LocalityPageContent
          initialProperties={initialProperties}
          localityName={locality}
          type={type} // This prop is essential for setting the filter's initial state
        />
        <Footer1 />
      </Suspense>
    </>
  );
}
