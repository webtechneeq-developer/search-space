import React from "react";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";
import CityPageLayout from "@/components/common/CityPageLayout";
import { properties } from "@/data/properties";
import ReadMore from "@/components/common/ReadMore";
import SeoLinks from "@/components/common/SeoLinks";

export default function NaviMumbaiPage() {
  const initialProperties = properties.navimumbai || [];
  const localities = [...new Set(initialProperties.map((p) => p.subLocation))];

  return (
    <>
      <Header1 />
      <CityPageLayout
        initialProperties={initialProperties}
        localities={localities}
        cityName="Navi Mumbai"
      />
      <SeoLinks/>
      <ReadMore />
      <Footer1 />
    </>
  );
}
