import Header1 from "@/components/headers/Header1";
import PropertyTypes from "@/components/homes/home-1/PropertyTypes";
import Properties1 from "@/components/properties/Properties1";
import React from "react";

export const metadata = {
  title:
    "Property Halfmap Grid || Homelengo - Real Estate React Nextjs Template",
  description: "Homelengo - Real Estate React Nextjs Template",
};
export default function page() {
  return (
    <>
      <Header1 />
      <Properties1 />
      <PropertyTypes />
    </>
  );
}
