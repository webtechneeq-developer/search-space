import React from "react";
import { notFound } from "next/navigation";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";
import { properties, allProperties } from "@/data/properties";
import { spaceData } from "@/data/spaces";
import CityPropertyListing from "@/components/common/CityPropertyListing";
import LocationGrid from "@/components/common/LocationGrid";

// This function tells Next.js all possible pages to pre-build
export async function generateStaticParams() {
  // Get all city slugs (e.g., 'mumbai', 'pune')
  const citySlugs = Object.keys(properties).map(city => ({ slug: city }));
  
  // Get all type slugs (e.g., 'coworking-office')
  const typeSlugs = spaceData.map(space => ({ slug: space.type }));
  
  // Combine them into one list for Next.js
  return [...citySlugs, ...typeSlugs];
}

function capitalizeWords(str) {
  if (!str) return "";
  return str.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export default function SlugPage({ params }) {
  const { slug } = params;

  // --- Logic to decide which page to show ---

  // Check if the slug matches a city name
  const isCity = Object.keys(properties).includes(slug.replace("-", "")); // handles 'navi-mumbai' -> 'navimumbai'
  
  // Check if the slug matches a space type
  const isSpaceType = spaceData.some(space => space.type === slug);

  // === RENDER CITY PAGE ===
  if (isCity) {
    const cityKey = slug.replace("-", "");
    const initialProperties = properties[cityKey] || [];
    const localities = [...new Set(initialProperties.map(p => p.subLocation))];

    return (
      <>
        <Header1 />
        <CityPropertyListing 
          initialProperties={initialProperties} 
          localities={localities}
          cityName={slug}
        />
        <Footer1 />
      </>
    );
  }

  // === RENDER SPACE TYPE PAGE ===
  if (isSpaceType) {
    const space = spaceData.find((s) => s.type === slug);
    
    if (Object.keys(space.cities).length === 0) {
      return (
        <>
          <Header1 />
          <div className="container text-center" style={{ padding: "100px 0" }}>
            <h2>No Cities Available</h2>
            <p className="lead text-muted">Locations for {capitalizeWords(slug)} are coming soon!</p>
          </div>
          <Footer1 />
        </>
      );
    }

    const locations = Object.entries(space.cities).map(([cityKey, subLocations]) => {
      const propertyCount = allProperties.filter(p => p.citySlug === cityKey).length;
      return {
        name: capitalizeWords(cityKey),
        url: `/${slug}/${cityKey}`,
        propertyCount,
      };
    });

    return (
      <>
        <Header1 />
        <LocationGrid
          title={`Available Cities for ${capitalizeWords(slug)}`}
          locations={locations}
        />
        <Footer1 />
      </>
    );
  }

  // If the slug is neither a city nor a type, show a 404 page
  notFound();
}