import Agents from "@/components/common/Agents";
import Brands from "@/components/common/Brands";
import Testimonials2 from "@/components/common/Testimonials2";
import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";

import Banner from "@/components/common/Banner";
import About from "@/components/otherPages/About";
import Slider1 from "@/components/property-details/Slider1";
import React from "react";
import { allProperties } from "@/data/demoProporties";
import SeoLinks from "@/components/common/SeoLinks";
import PageTitleAbout from "@/components/otherPages/PageTitleAbout";
import BenefitsAbout from "@/components/otherPages/BenefitsAbout";

import Coworking_Office from "@/components/otherPages/coworking_pages/coworking_office";
import CoworkingOfficeTitle from "@/components/otherPages/coworking_pages/CoworkingOfficeTitle";

export const metadata = {
  title: "CoWorking Spaces || Homelengo - Real Estate React Nextjs Template",
  description: "Homelengo - Real Estate React Nextjs Template",
};
export default function page() {
  return (
    <>
      <Header1 />
      {/* <About /> */}
      <CoworkingOfficeTitle />
      {/* <Agents /> */}
      {/* <Brands /> */}
      <Coworking_Office />
      {/* <BenefitsAbout /> */}
      {/* <Testimonials2 /> */}
      <Banner />
      <SeoLinks />
      <Footer1 />
    </>
  );
}
