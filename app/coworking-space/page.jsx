// app/coworking-space/page.jsx

import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import Banner from "@/components/common/Banner";
import React from "react";
import SeoLinks from "@/components/common/SeoLinks";
import Locations from "@/components/common/Locations"; // This component should show the city grid
import { properties } from "@/data/demoProporties";

export const metadata = {
  title:
    "CoWorking Spaces in India || Homelengo - Real Estate React Nextjs Template",
  description: "Homelengo - Real Estate React Nextjs Template",
};

export default function CoworkingSpacePage() {
  return (
    <>
      <Header1 />
      <Banner />
      <Locations properties={properties} />
      <SeoLinks />
      <Footer1 />
    </>
  );
}
