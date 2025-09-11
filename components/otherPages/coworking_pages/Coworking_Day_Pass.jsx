import React from "react";
import Locations from "@/components/common/Locations";
import { properties } from "@/data/demoProporties";
export default function Coworking_Day_Pass() {
  return (
    <>
      <div className="mt-20 mb-10">
        <Locations properties={properties} />
      </div>
    </>
  );
}
