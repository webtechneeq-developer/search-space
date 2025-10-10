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
  // Logic Updated: Initial state now uses `priceRange`
  const [filters, setFilters] = useState({
    spaceType: "all",
    seats: "",
    priceRange: "any",
  });

  const [filteredProperties, setFilteredProperties] =
    useState(initialProperties);

  useEffect(() => {
    // Logic Updated: Filtering logic is completely revised
    const newFilteredProperties = initialProperties.filter((property) => {
      // Check if any pricing option within the property matches the filters
      return property.pricing.some((option) => {
        // Filter by Space Type
        if (filters.spaceType !== "all" && option.type !== filters.spaceType) {
          return false;
        }

        // New price range filtering logic
        if (filters.priceRange && filters.priceRange !== "any") {
          const optionPrice = option.price;
          if (filters.priceRange.includes("+")) {
            // Handles "40000+"
            const minPrice = parseInt(filters.priceRange.replace("+", ""), 10);
            if (optionPrice < minPrice) {
              return false;
            }
          } else {
            // Handles ranges like "5000-10000"
            const [minPrice, maxPrice] = filters.priceRange
              .split("-")
              .map(Number);
            if (optionPrice < minPrice || optionPrice > maxPrice) {
              return false;
            }
          }
        }

        // Filter by Seats
        if (filters.seats && (option.seats || 0) < parseInt(filters.seats)) {
          return false;
        }

        // If all checks pass, the property is a match
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

      {/* Styling Preserved: This section is identical to your original code */}
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
