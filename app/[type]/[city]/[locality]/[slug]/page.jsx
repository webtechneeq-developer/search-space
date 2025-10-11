import React from "react";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";
import PropertyDetailsTitle from "@/components/property-details/PropertyDetailsTitle";
import PropertySlider from "@/components/property-details/PropertySlider";
import PropertyContentDetails from "@/components/property-details/PropertyContentDetails";
import { getProperties } from "@/lib/data"; // Use the dynamic data fetching function
import { notFound } from "next/navigation";

// This function now fetches data to generate static pages at build time
export async function generateStaticParams() {
  const allProperties = await getProperties();
  return allProperties.map((property) => ({
    type: property.typeSlug,
    city: property.citySlug,
    locality: property.localitySlug,
    slug: property.slug,
  }));
}

// The page is now async to fetch data on the server
export default async function PropertyDetailPage({ params }) {
  const allProperties = await getProperties();
  const propertyItem = allProperties.find((elm) => elm.slug === params.slug);

  if (!propertyItem) {
    // If no property matches the slug, show a 404 page
    notFound();
  }

  // Format the image paths correctly for the slider
  const propertyImages = (propertyItem.images || []).map(
    (img) => `/uploads/${img.name || img.image_name}`
  );

  return (
    <>
      <Header1 />
      <PropertyDetailsTitle propertyItem={propertyItem} />
      <PropertySlider propertyImg={propertyImages} />
      <PropertyContentDetails propertyItem={propertyItem} />
      <Footer1 />
    </>
  );
}
