import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import DetailsTitle1 from "@/components/property-details/DetailsTitle1";
import Gallery from "@/components/property-details/Gallery";
import PropertyDetails from "@/components/property-details/PropertyDetails";
import React from "react";

export const metadata = {
  title: "Property Details 03 || Homelengo - Real Estate React Nextjs Template",
  description: "Homelengo - Real Estate React Nextjs Template",
};
export default function page({ params }) {
  const propertyItem =
    allProperties.filter((elm) => elm.id == params.id)[0] || allProperties[0];
  return (
    <>
      <Header1 />
      <DetailsTitle1 propertyItem={propertyItem} />
      <Gallery />
      <PropertyDetails propertyItem={propertyItem} />
      <Footer1 />
    </>
  );
}
