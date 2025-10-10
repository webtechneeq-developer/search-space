import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import DetailsTitle1 from "@/components/property-details/DetailsTitle1";
import Gallery from "@/components/property-details/Gallery";
import PropertyDetails from "@/components/property-details/PropertyDetails";
import React from "react";

export const metadata = {
  title: "Property Details 03",
  description: "",
};
export default function page() {
  return (
    <>
      <Header1 />
      <Gallery />
      <Footer1 />
    </>
  );
}
