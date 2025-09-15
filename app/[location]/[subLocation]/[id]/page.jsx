// app/[location]/[sublocation]/[id]/page.jsx
import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import PropertyContentDetails from "@/components/property-details/PropertyContentDetails";
import PropertyDetailsTitle from "@/components/property-details/PropertyDeatilsTitle";
import PropertySlider from "@/components/property-details/PropertySlider";
import React from "react";
import { allProperties } from "@/data/demoProporties";

export async function generateMetadata({ params }) {
  const propertyItem = allProperties.find((elm) => elm.id == params.id);
  const propertyTitle = propertyItem ? propertyItem.title : "Property Details";
  return {
    title: `${propertyTitle} || Homelengo - Real Estate React Nextjs Template`,
    description: propertyItem
      ? propertyItem.description
      : "View property details.",
  };
}

export default function PropertyDetailsPage({ params }) {
  const propertyItem = allProperties.find((elm) => elm.id == params.id);

  if (!propertyItem) {
    return <div>Property not found.</div>;
  }

  return (
    <>
      <Header1 />
      <PropertyDetailsTitle propertyItem={propertyItem} />
      <PropertySlider propertyImg={propertyItem.singlePageImgSrc} />
      <PropertyContentDetails propertyItem={propertyItem} />
      <Footer1 />
    </>
  );
}
