"use client";
import React from "react";

export default function PropertyFilter({
  filters,
  setFilters,
  onFilterChange,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const handlePriceChange = (e) => {
    onFilterChange({ ...filters, maxPrice: e.target.value });
  };

  const clearFilters = () => {
    onFilterChange({
      spaceType: "all",
      workingDays: "all",
      seats: 0,
      maxPrice: 50000,
    });
  };

  return (
    <div className="bg-light p-4 rounded-3 mb-5 shadow-sm">
      <div className="row g-3 align-items-end">
        {/* Space Type */}
        <div className="col-md-4 col-lg-3">
          <label htmlFor="spaceType" className="form-label fw-bold">
            Space Type
          </label>
          <select
            id="spaceType"
            name="spaceType"
            className="form-select"
            value={filters.spaceType}
            onChange={handleInputChange}
          >
            <option value="all">All Types</option>
            <option value="Private Office">Private Office</option>
            <option value="Dedicated Desk">Dedicated Desk</option>
            <option value="Flexi Desk">Flexi Desk</option>
            <option value="Meeting Room">Meeting Room</option>
            <option value="Virtual Office">Virtual Office</option>
            <option value="Day Pass">Day Pass</option>
          </select>
        </div>

        {/* Working Days */}
        <div className="col-md-4 col-lg-3">
          <label htmlFor="workingDays" className="form-label fw-bold">
            Working Days
          </label>
          <select
            id="workingDays"
            name="workingDays"
            className="form-select"
            value={filters.workingDays}
            onChange={handleInputChange}
          >
            <option value="all">Any</option>
            <option value="Mon-Sat">Mon - Sat</option>
            <option value="Mon-Fri">Mon - Fri</option>
            <option value="All 7 Days">All 7 Days</option>
          </select>
        </div>

        {/* Seats */}
        <div className="col-md-4 col-lg-2">
          <label htmlFor="seats" className="form-label fw-bold">
            Seats
          </label>
          <input
            type="number"
            id="seats"
            name="seats"
            className="form-control"
            min="0"
            value={filters.seats}
            onChange={handleInputChange}
            placeholder="Any"
          />
        </div>

        {/* Price Range */}
        <div className="col-md-8 col-lg-4">
          <label htmlFor="maxPrice" className="form-label fw-bold">
            Price Range (Max: ₹{Number(filters.maxPrice).toLocaleString()})
          </label>
          <input
            type="range"
            id="maxPrice"
            name="maxPrice"
            className="form-range"
            min="1000"
            max="50000"
            step="1000"
            value={filters.maxPrice}
            onChange={handlePriceChange}
          />
        </div>

        {/* Clear Button */}
        <div className="col-md-4 col-lg-12 text-end">
          <button className="btn btn-secondary" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
