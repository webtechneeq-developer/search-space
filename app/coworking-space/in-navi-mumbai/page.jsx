import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import Banner from "@/components/common/Banner";
import React from "react";
import SeoLinks from "@/components/common/SeoLinks";
import Locations from "@/components/common/Locations";
import { properties } from "@/data/demoProporties"; // Assuming this is the correct path to your data

export const metadata = {
  title:
    "CoWorking Spaces in Navi Mumbai || Homelengo - Real Estate React Nextjs Template",
  description: "Homelengo - Real Estate React Nextjs Template",
};

export default function MumbaiCoworkingPage() {
  // Filter the properties to only include Mumbai locations
  const mumbaiProperties = properties.mumbai;

  return (
    <>
      <Header1 />
      <Banner />
      <Locations properties={mumbaiProperties} />
      <SeoLinks />
      <Footer1 />
    </>
  );
}
