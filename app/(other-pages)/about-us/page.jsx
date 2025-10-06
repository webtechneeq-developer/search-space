import Agents from "@/components/common/Agents";
import Brands from "@/components/common/Brands";
import Testimonials2 from "@/components/common/Testimonials2";
import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import Benefit from "@/components/homes/home-2/Benefit";
import Banner from "@/components/common/Banner";
import About from "@/components/otherPages/About";
import Slider1 from "@/components/property-details/Slider1";
import React from "react";
import SeoLinks from "@/components/common/SeoLinks";
import PageTitleAbout from "@/components/otherPages/PageTitleAbout";
// import Benefits from "@/components/homes/home-5/Benefits";
import ReadMore from "@/components/common/ReadMore";


export const metadata = {
  title: "About Us || Homelengo - Real Estate React Nextjs Template",
  description: "Homelengo - Real Estate React Nextjs Template",
};
export default function page() {
  return (
    <>
      <Header1 />
      {/* <About /> */}
      <PageTitleAbout />
      <Benefit />

      {/* <Slider1 /> */}
      {/* <Agents /> */}
      {/* <Brands />
      <Benefit />
      <Testimonials2 /> */}
      <Banner />
      <SeoLinks/>
      <ReadMore />
      <Footer1 />
    </>
  );
}
