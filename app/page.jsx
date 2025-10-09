import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import Blogs from "@/components/homes/home-1/Blogs";
import Hero from "@/components/homes/home-1/Hero";
import Locations from "@/components/common/Locations";
import WhatsAppFloatingButton from "@/components/common/WhatsAppFloatingButton";
import Services from "@/components/homes/home-1/Services";
import { properties } from "@/data/properties";
import PropertyTypes from "@/components/homes/home-1/PropertyTypes";
import SeoLinks from "@/components/common/SeoLinks";
import ReadMore from "@/components/common/ReadMore";


export const metadata = {
  title: "Search Spaces",
  description: "Search Spaces",
};
export default function Home() {
  return (
    <>
      <Header1 />
      <Hero />
      <PropertyTypes />
      {/* <AllProperties /> */}
      <Locations properties={properties} />
      <Services />
      {/*       <Benefit /> */}
      {/*       <Testimonials /> */}
      {/*       <Agents /> */}
      {/*       <Brands /> */}
      {/* <Blogs /> */}
      <SeoLinks />
      <ReadMore />
      <WhatsAppFloatingButton
        phone="+919820279750"
        message="Hello! I have a question about your service."
        size={60}
        position="bottom-right"
      />
      <Footer1 />
    </>
  );
}
