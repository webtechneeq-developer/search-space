"use client";

import React, { useState, useEffect } from "react";
import PropertyCard from "@/components/common/PropertyCard";
import CityFilter from "@/components/common/CityFilter";

function capitalizeWords(str) {
  if (!str) return "";
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// This component receives the `type` prop from its parent but will not pre-filter
export default function LocalityPageContent({
  initialProperties,
  localityName,
  type, // Type is kept for context but not used for initial filtering
}) {
  const [filters, setFilters] = useState({
    // The filter now starts with 'all' to show all properties initially
    spaceType: "all",
    seats: "",
    maxPrice: 50000,
    lockInPeriod: "any", // FIX: Added missing lockInPeriod to the initial state
  });

  const [filteredProperties, setFilteredProperties] =
    useState(initialProperties);

  // This effect applies the filters whenever the user changes them
  useEffect(() => {
    const newFilteredProperties = initialProperties.filter((property) => {
      if (filters.lockInPeriod !== "any") {
        const propertyLockIn = parseInt(property.lockInPeriod) || 0;
        if (propertyLockIn > parseInt(filters.lockInPeriod)) {
          return false;
        }
      }
      return property.pricing.some((option) => {
        if (filters.spaceType !== "all" && option.type !== filters.spaceType)
          return false;
        if (option.price > filters.maxPrice) return false;
        if (filters.seats && (option.seats || 0) < parseInt(filters.seats))
          return false;
        return true;
      });
    });
    setFilteredProperties(newFilteredProperties);
  }, [filters, initialProperties]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        Best {capitalizeWords(type)} in {capitalizeWords(localityName)}
      </h2>


      <CityFilter filters={filters} onFilterChange={setFilters} />

      <div className="row">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="lead text-muted my-5">
              No properties found matching your criteria in{" "}
              {capitalizeWords(localityName)}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
