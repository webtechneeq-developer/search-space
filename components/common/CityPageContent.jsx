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
  const [filters, setFilters] = useState({
    spaceType: "all",
    seats: "",
    maxPrice: 50000,
    lockInPeriod: "any",
  });

  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    // Start with the full list of localities for this city
    const newFilteredLocalities = initialLocalities.filter((locality) => {
      // Check if ANY property in this locality matches ALL the active filters
      return allProperties.some((property) => {
        // 1. Property must be in the current locality
        if (property.subLocation.toLowerCase() !== locality.toLowerCase()) {
          return false;
        }

        // 2. Filter by Lock-in Period (Property-level filter)
        if (filters.lockInPeriod !== "any") {
          const propertyLockIn = parseInt(property.lockInPeriod) || 0;
          if (propertyLockIn > parseInt(filters.lockInPeriod)) {
            return false;
          }
        }

        // 3. Check if any pricing option within the property matches the remaining filters
        return property.pricing.some((option) => {
          // Filter by Space Type
          if (
            filters.spaceType !== "all" &&
            option.type !== filters.spaceType
          ) {
            return false;
          }
          // Filter by Price
          if (option.price > filters.maxPrice) {
            return false;
          }
          // Filter by Seats (only if a value is entered)
          if (filters.seats && (option.seats || 0) < parseInt(filters.seats)) {
            return false;
          }

          // If we get here, this pricing option is a match!
          return true;
        });
      });
    });

    // Map the final list of localities to the format needed by LocationGrid
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
