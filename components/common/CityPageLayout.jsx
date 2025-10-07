"use client";
import React, { useState, useEffect } from "react";
import PropertyCard from "@/components/common/PropertyCard";
import AdvPropertyFilter from "@/components/common/AdvPropertyFilter"; // Using your renamed filter

export default function CityPageLayout({
  initialProperties,
  localities,
  cityName,
}) {
  const [filters, setFilters] = useState({
    locality: "all",
    spaceType: "all",
    seats: "",
    maxPrice: 5000,
    lockInPeriod: "any",
  });

  const [filteredProperties, setFilteredProperties] =
    useState(initialProperties);

  useEffect(() => {
    let newFiltered = initialProperties.filter((property) => {
      // Locality Filter
      if (
        filters.locality !== "all" &&
        property.subLocation.toLowerCase() !== filters.locality.toLowerCase()
      ) {
        return false;
      }

      // Lock-in Period Filter
      if (filters.lockInPeriod !== "any") {
        const propertyLockIn = parseInt(property.lockInPeriod) || 0;
        if (propertyLockIn > parseInt(filters.lockInPeriod)) return false;
      }

      // Check pricing options for space type, price, and seats
      return property.pricing.some((option) => {
        if (filters.spaceType !== "all" && option.type !== filters.spaceType)
          return false;
        if (option.price > filters.maxPrice) return false;
        if (filters.seats && (option.seats || 0) < parseInt(filters.seats))
          return false;
        return true;
      });
    });

    setFilteredProperties(newFiltered);
  }, [filters, initialProperties]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-capitalize">
        Workspaces in {cityName}
      </h2>

      <AdvPropertyFilter
        filters={filters}
        onFilterChange={setFilters}
        localities={localities}
      />

      <div className="row">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <h4 className="text-muted">No Properties Found</h4>
            <p>Try adjusting your filters to find more results.</p>
          </div>
        )}
      </div>
    </div>
  );
}
