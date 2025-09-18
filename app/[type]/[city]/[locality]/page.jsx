import React, { Suspense } from "react";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";
import LocalityPageContent from "@/components/common/LocalityPageContent"; // Import the new content component
import { allProperties } from "@/data/properties";
import { spaceData } from "@/data/spaces";

export async function generateStaticParams() {
  // Your generateStaticParams function remains the same
  const params = [];
  spaceData.forEach((space) => {
    for (const city in space.cities) {
      space.cities[city].forEach((locality) => {
        params.push({
          type: space.type,
          city: `${city}`,
          locality: `${locality}`,
        });
      });
    }
  });
  return params;
}

// This is now a Server Component
export default function LocalityPage({ params }) {
  const { locality } = params;

  // Do the initial data filtering on the server
  const initialProperties = allProperties.filter(
    (p) => p.subLocation.toLowerCase() === locality.toLowerCase()
  );

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header1 />
        {/* Pass the server-fetched data as a prop to the client component */}
        <LocalityPageContent
          initialProperties={initialProperties}
          localityName={locality}
        />
        <Footer1 />
      </Suspense>
    </>
  );
}
