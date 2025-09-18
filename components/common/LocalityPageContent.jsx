"use client";

import React, { useState, useEffect } from "react";
import PropertyCard from "@/components/common/PropertyCard";
import CityFilter from "@/components/common/CityFilter"; // We can reuse the same filter UI

function capitalizeWords(str) {
  if (!str) return "";
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function LocalityPageContent({
  initialProperties,
  localityName,
}) {
  const [filters, setFilters] = useState({
    spaceType: "all",
    seats: "",
    maxPrice: 50000,
    lockInPeriod: "any",
  });

  const [filteredProperties, setFilteredProperties] =
    useState(initialProperties);

  useEffect(() => {
    // Start with the initial properties for this locality
    const newFilteredProperties = initialProperties.filter((property) => {
      // Filter by Lock-in Period (Property-level filter)
      if (filters.lockInPeriod !== "any") {
        const propertyLockIn = parseInt(property.lockInPeriod) || 0;
        if (propertyLockIn > parseInt(filters.lockInPeriod)) {
          return false;
        }
      }

      // Check if any pricing option within the property matches the other filters
      return property.pricing.some((option) => {
        if (filters.spaceType !== "all" && option.type !== filters.spaceType)
          return false;
        if (option.price > filters.maxPrice) return false;
        if (filters.seats && (option.seats || 0) < parseInt(filters.seats))
          return false;

        // If all checks pass for this pricing option, the property is a match
        return true;
      });
    });

    setFilteredProperties(newFilteredProperties);
  }, [filters, initialProperties]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-capitalize">
        Workspaces in {capitalizeWords(localityName)}
      </h2>

      {/* Render the filter component */}
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
