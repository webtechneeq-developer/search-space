"use client";

import React, { useState, useEffect } from "react";
import LocationGrid from "@/components/common/LocationGrid";
import CityFilter from "@/components/common/CityFilter";
import { allProperties } from "@/data/properties";

function capitalizeWords(str) {
  if (!str) return "";
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function CityPageContent({ type, cityName, initialLocalities }) {
  // 1. Updated initial filter state to match the new CityFilter component
  const [filters, setFilters] = useState({
    spaceType: "all",
    seats: "",
    priceRange: "any", // Changed from maxPrice to priceRange
  });

  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    const newFilteredLocalities = initialLocalities.filter((locality) => {
      return allProperties.some((property) => {
        if (property.subLocation.toLowerCase() !== locality.toLowerCase()) {
          return false;
        }

        return property.pricing.some((option) => {
          // Filter by Space Type
          if (
            filters.spaceType !== "all" &&
            option.type !== filters.spaceType
          ) {
            return false;
          }

          // 2. Replaced price slider logic with price range dropdown logic
          if (filters.priceRange && filters.priceRange !== "any") {
            const itemPrice = option.price;

            if (filters.priceRange.includes("+")) {
              // Handles "40000+"
              const minPrice = parseInt(
                filters.priceRange.replace("+", ""),
                10
              );
              if (itemPrice < minPrice) {
                return false;
              }
            } else {
              // Handles ranges like "5000-10000"
              const [minPrice, maxPrice] = filters.priceRange
                .split("-")
                .map(Number);
              if (itemPrice < minPrice || itemPrice > maxPrice) {
                return false;
              }
            }
          }

          // Filter by Seats
          if (filters.seats && (option.seats || 0) < parseInt(filters.seats)) {
            return false;
          }

          return true;
        });
      });
    });

    const locationsForGrid = newFilteredLocalities.map((locality) => {
      const propertyCount = allProperties.filter(
        (p) => p.subLocation.toLowerCase() === locality.toLowerCase()
      ).length;
      return {
        name: capitalizeWords(locality),
        url: `/${type}/${cityName}/${locality}`,
        propertyCount,
      };
    });

    setFilteredLocations(locationsForGrid);
  }, [filters, initialLocalities, cityName, type]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        {capitalizeWords(type)} in {capitalizeWords(cityName)}
      </h2>

      <CityFilter filters={filters} onFilterChange={setFilters} />

      <LocationGrid
        title="Available Localities"
        locations={filteredLocations}
        noLocationMessage="No localities match your current filters."
      />
    </div>
  );
}
