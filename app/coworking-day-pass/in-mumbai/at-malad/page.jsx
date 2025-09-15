import React from "react";
import { properties } from "@/data/spaces";

export default function CoworkingLocalityPage() {
  const type = "coworking-office";
  const city = "mumbai";
  const locality = "andheri";

  const cityData = properties[city];
  const filteredProperties = cityData
    ? cityData.filter(
        (prop) =>
          prop.type.toLowerCase().replace(" ", "-") === type &&
          prop.subLocation.toLowerCase().replace(" ", "-") === locality
      )
    : [];

  return (
    <div>
      <h1>
        {type.replace(/-/g, " ")} in {locality.replace(/-/g, " ")} (
        {city.replace(/-/g, " ")})
      </h1>
      {filteredProperties.length > 0 ? (
        filteredProperties.map((prop) => (
          <div key={prop.id}>
            <h2>{prop.title}</h2>
            <p>Address: {prop.address}</p>
            <p>Price: ₹{prop.price}</p>
            {/* Display more property details as needed */}
          </div>
        ))
      ) : (
        <p>No properties found for this location and type.</p>
      )}
    </div>
  );
}
