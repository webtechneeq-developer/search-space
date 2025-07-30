import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import Agents from "@/components/common/Agents";
import Benefit from "@/components/common/Benefit";
import Blogs from "@/components/homes/home-1/Blogs";
import Brands from "@/components/common/Brands";
import Hero from "@/components/homes/home-1/Hero";
import Locations from "@/components/common/Locations";
import Properties from "@/components/homes/home-1/Properties";
import Properties2 from "@/components/homes/home-1/Properties2";
import Services from "@/components/homes/home-1/Services";
import Testimonials from "@/components/common/Testimonials";
import { properties } from "@/data/demoProporties";

export const metadata = {
  title: "Search Spaces",
  description: "Search Spaces",
};
export default function Home() {
  
  return (
    <>
      <Header1 />
      <Hero />
      <Properties />
      <Locations properties={properties}/>
      <Services />
{/*       <Benefit /> */}
{/*       <Testimonials /> */}
{/*       <Agents /> */}
{/*       <Brands /> */}
      <Blogs />
      <Footer1 />
    </>
  );
}
