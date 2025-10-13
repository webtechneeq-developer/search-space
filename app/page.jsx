import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";
import Hero from "@/components/homes/home-1/Hero";
import Locations from "@/components/common/Locations";
import Services from "@/components/homes/home-1/Services";
import PropertyTypes from "@/components/homes/home-1/PropertyTypes";
import SeoLinks from "@/components/common/SeoLinks";
import ReadMore from "@/components/common/ReadMore";
// Import both data fetching functions
import { getProperties, getLocations } from "@/lib/data";

export const metadata = {
  title: "Search Spaces",
  description: "Search Spaces",
};

// Helper function to create a URL-friendly slug from a city name
const createCitySlug = (cityName) => {
  if (!cityName) return "";
  return cityName.toLowerCase().replace(/ /g, "-");
};

export default async function Home() {
  // 1. Fetch all necessary data from the database
  const allProperties = await getProperties();
  const allLocations = await getLocations();

  // 2. Group properties by city to get the counts
  const propertiesByCity = allProperties.reduce((acc, property) => {
    const citySlug = createCitySlug(property.city);
    if (citySlug) {
      if (!acc[citySlug]) {
        acc[citySlug] = [];
      }
      acc[citySlug].push(property);
    }
    return acc;
  }, {});

  // 3. Format the data for the Locations component, now including the dynamic image
  const locationsData = Object.keys(propertiesByCity).map((citySlug) => {
    // Find the corresponding city in the locations data to get its image
    const locationInfo = allLocations.find(
      (loc) => loc.slug === citySlug && loc.type === "city"
    );

    const imageUrl = locationInfo?.image_name
      ? `/uploads/cities/${locationInfo.image_name}`
      : "/images/cities/default-city.webp"; // Fallback image

    return {
      name: citySlug,
      url: `/${citySlug}`,
      propertyCount: propertiesByCity[citySlug].length,
      image: imageUrl, // Use the image from the database
    };
  });

  return (
    <>
      <Header1 />
      <Hero />
      <PropertyTypes />
      {/* Pass the fully dynamic locationsData to the component */}
      <Locations locations={locationsData} />
      <Services />
      <SeoLinks />
      <ReadMore />
      <Footer1 />
    </>
  );
}
