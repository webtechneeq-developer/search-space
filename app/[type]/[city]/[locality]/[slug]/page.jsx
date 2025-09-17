import React from "react";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";
import PropertyDetailsTitle from "@/components/property-details/PropertyDetailsTitle";
import PropertySlider from "@/components/property-details/PropertySlider";
import PropertyContentDetails from "@/components/property-details/PropertyContentDetails";
import { allProperties } from "@/data/properties";

export async function generateStaticParams() {
  return allProperties.map((property) => ({
    type: property.typeSlug,
    city: property.citySlug,
    locality: property.localitySlug,
    slug: property.slug,
  }));
}

export default function PropertyDetailPage({ params }) {
  const propertyItem = allProperties.find((elm) => elm.slug === params.slug);

  if (!propertyItem) {
    return <div>Property not found</div>;
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
