import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import Banner from "@/components/common/Banner";
import React from "react";
import SeoLinks from "@/components/common/SeoLinks";
import Locations from "@/components/common/Locations";
import { properties } from "@/data/demoProporties";

export const metadata = {
  title: "CoWorking Office || Homelengo - Real Estate React Nextjs Template",
  description: "Homelengo - Real Estate React Nextjs Template",
};
export default function page() {
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
