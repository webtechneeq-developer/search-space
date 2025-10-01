import Banner from "@/components/common/Banner";
import Faqs from "@/components/common/Faqs";
import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import PageTitle2 from "@/components/otherPages/PageTitle2";
import Pricing from "@/components/otherPages/Disclaimer";
import React from "react";
import isclaimer from "@/components/otherPages/Disclaimer";
import Disclaimer from "@/components/otherPages/Disclaimer";

export const metadata = {
  title: "Pricing || Homelengo - Real Estate React Nextjs Template",
  description: "Homelengo - Real Estate React Nextjs Template",
};
export default function page() {
  return (
    <>
      <Header1 />
      <PageTitle2 />
      <Disclaimer/>
      {/* <Faqs /> */}
      <Banner />
      <Footer1 />
    </>
  );
}
