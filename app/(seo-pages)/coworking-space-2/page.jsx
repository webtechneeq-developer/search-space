import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import SeoProperties from "@/components/properties/SeoProperties";
import React from "react";
import { Suspense } from "react";

export const metadata = {
  title:
    "Topmap Grid Property || Homelengo - Real Estate React Nextjs Template",
  description: "Homelengo - Real Estate React Nextjs Template",
};
export default function page() {
  const type = "coworking-space"; // Assuming this is the type you want to filter by
  const location = "mumbai"; // Assuming this is the location you want to filter by
  const sublocation = "kurla"; // Assuming this is the sublocation you want to filter by
  return (
    <>
      <Suspense fallback={<div>Loading properties...</div>}>
        <Header1 />
        <SeoProperties
          spaceType={type}
          location={location}
          sublocation={sublocation}
        />
        <Footer1 />
      </Suspense>
    </>
  );
}
