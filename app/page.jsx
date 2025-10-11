import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";
import Hero from "@/components/homes/home-1/Hero";
import Locations from "@/components/common/Locations";
import Services from "@/components/homes/home-1/Services";
import PropertyTypes from "@/components/homes/home-1/PropertyTypes";
import SeoLinks from "@/components/common/SeoLinks";
import ReadMore from "@/components/common/ReadMore";
import { getProperties } from "@/lib/data";

export const metadata = {
  title: "Search Spaces",
  description: "Search Spaces",
};

// Image mapping for cities
const cityImages = {
  mumbai: "/images/cities/new-mumbai-location.webp",
  "navi-mumbai": "/images/cities/navi-mumbai-img2.webp",
  pune: "/images/cities/pune-img1.webp",
};

// Helper function to create a URL-friendly slug from a city name
const createCitySlug = (cityName) => {
  if (!cityName) return "";
  return cityName.toLowerCase().replace(/ /g, "-");
};

export default async function Home() {
  const allProperties = await getProperties();

  // Group properties by city to count them
  const propertiesByCity = allProperties.reduce((acc, property) => {
    // Generate the slug from the 'city' field provided by the database
    const citySlug = createCitySlug(property.city);
    if (citySlug) {
      if (!acc[citySlug]) {
        acc[citySlug] = [];
      }
      acc[citySlug].push(property);
    }
    return acc;
  }, {});

  // Format the data for the Locations component
  const locationsData = Object.keys(propertiesByCity).map((citySlug) => ({
    name: citySlug,
    url: `/${citySlug}`,
    propertyCount: propertiesByCity[citySlug].length,
    image: cityImages[citySlug] || "/images/cities/default-city.webp", // Fallback image
  }));

  return (
    <>
      <Header1 />
      <Hero />
      <PropertyTypes />
      {/* Pass the dynamically generated locationsData to the component */}
      <Locations locations={locationsData} />
      <Services />
      <SeoLinks />
      <ReadMore />
      <Footer1 />
    </>
  );
}
