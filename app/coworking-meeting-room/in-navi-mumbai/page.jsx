import React from "react";
import Link from "next/link";
import { spaceData } from "@/data/spaces";

export default function CoworkingCityPage() {
  const spaceType = spaceData.find((s) => s.type === "coworking-office");
  const city = "mumbai";
  const localities = spaceType?.cities[city];

  if (!spaceType || !localities) {
    return <div>Location not found.</div>;
  }

  return (
    <div>
      <h1>
        {spaceType.type.replace(/-/g, " ")} in {city.replace(/-/g, " ")}
      </h1>
      <ul>
        {localities.map((locality) => (
          <li key={locality}>
            <Link href={`/coworking-office/in-${city}/at-${locality}`}>
              {locality.replace(/-/g, " ")}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
