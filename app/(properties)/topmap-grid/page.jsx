import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import Properties3 from "@/components/properties/Properties3";
import React from "react";
import { Suspense } from "react";

export const metadata = {
  title:
    "Topmap Grid Property || Homelengo - Real Estate React Nextjs Template",
  description: "Homelengo - Real Estate React Nextjs Template",
};
export default function page() {
  return (
    <>
      <Suspense fallback={<div>Loading properties...</div>}>
        <Header1 />
        <Properties3 />
        <Footer1 />
      </Suspense>
    </>
  );
}
