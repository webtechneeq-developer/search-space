// app/[type]/in-[city]/at-[locality]/page.jsx
import React, { Suspense } from "react";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";
import Banner from "@/components/common/Banner";
import PropertyCard from "@/components/common/PropertyCard";
import { allProperties } from "@/data/properties";
import { spaceData } from "@/data/spaces";

// generateStaticParams remains the same as before...
export async function generateStaticParams() {
  const params = [];
  spaceData.forEach((space) => {
    for (const city in space.cities) {
      space.cities[city].forEach((locality) => {
        params.push({
          type: space.type,
          city: `in-${city}`,
          locality: `at-${locality}`,
        });
      });
    }
  });
  return params;
}

export default function LocalityPage({ params }) {
  const { locality } = params;
  const localityName = locality.replace("at-", "");

  // Filter properties based only on the subLocation from the URL
  const filteredProperties = allProperties.filter(
    (p) => p.subLocation.toLowerCase() === localityName.toLowerCase()
  );

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header1 />
        <Banner />
        <div className="container mt-5">
          <div className="row">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="col-12">
                <p>No properties found in {localityName}.</p>
              </div>
            )}
          </div>
        </div>
        <Footer1 />
      </Suspense>
    </>
  );
}
