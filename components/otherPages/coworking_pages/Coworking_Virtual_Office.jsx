import React from "react";
import Image from "next/image";
import Locations from "@/components/common/Locations";
import { properties } from "@/data/demoProporties";

export default function Coworking_Virtual_Office() {
  return (
    <>
      <div className="mt-20 mb-10">
        <Locations properties={properties} />
      </div>
    </>
  );
}
