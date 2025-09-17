import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import PropertyContentDetails from "@/components/property-details/PropertyContentDetails";
import PropertyDetailsTitle from "@/components/property-details/PropertyDetailsTitle";
import PropertySlider from "@/components/property-details/PropertySlider";
import { allProperties } from "@/data/demoProporties";
import React from "react";

export const metadata = {
  title: "Property Details 01 || Homelengo - Real Estate React Nextjs Template",
  description: "Homelengo - Real Estate React Nextjs Template",
};
export default function page({ params }) {
  const propertyItem =
    allProperties.filter((elm) => elm.id == params.id)[0] || allProperties[0];

  return (
    <>
      <Header1 />
      <PropertyDetailsTitle propertyItem={propertyItem} />
      <PropertyContentDetails propertyItem={propertyItem} />
      <PropertySlider propertyImg={propertyItem.singlePageImgSrc} />
      <Footer1 />
    </>
  );
}
