import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import Properties3 from "@/components/properties/Properties3";
import Properties7 from "@/components/properties/Properties7";
import SubLocation from "@/components/properties/Properties8";
import Properties8 from "@/components/properties/Properties8";
import React from "react";
import { Suspense } from "react";

export const metadata = {
  title:
    "Topmap Grid Property || Homelengo - Real Estate React Nextjs Template",
  description: "Homelengo - Real Estate React Nextjs Template",
};
export default function page({ params }) {
  const { location } = params;

  return (
    <>
      <Suspense fallback={<div>Loading properties...</div>}>
        <Header1 />
        <Properties7 location={location} />
        <Footer1 />
      </Suspense>
    </>
  );
}
