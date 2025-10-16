"use client";
import React from "react";
import { FaUndo, FaUsers, FaRupeeSign } from "react-icons/fa"; // 1. Import Rupee Icon

// Data for our interactive pill buttons
const spaceTypes = [
  "Private Cabin",
  "Dedicated Desk",
  "Flexi Desk",
  "Day Pass",
  "Meeting Room",
  "Conference Room",
  "Virtual Office",
];

// 2. Define the price ranges for the dropdown
const priceRanges = [
  { value: "0-5000", label: "₹0 - ₹5,000" },
  { value: "5000-10000", label: "₹5,000 - ₹10,000" },
  { value: "10000-15000", label: "₹10,000 - ₹15,000" },
  { value: "15000-20000", label: "₹15,000 - ₹20,000" },
  { value: "20000-25000", label: "₹20,000 - ₹25,000" },
  { value: "25000-30000", label: "₹25,000 - ₹30,000" },
  { value: "30000-35000", label: "₹30,000 - ₹35,000" },
  { value: "35000-40000", label: "₹35,000 - ₹40,000" },
  { value: "40000+", label: "₹40,000 +" },
];

export default function CityFilter({ filters, onFilterChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const handleSpaceTypeClick = (type) => {
    onFilterChange({ ...filters, spaceType: type });
  };

  const clearFilters = () => {
    onFilterChange({
      spaceType: "all",
      seats: "",
      priceRange: "any", // 3. Update reset logic for the new dropdown
    });
  };

  return (
    <div className="filter-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0 fw-bold d-flex align-items-center">
          <i className="icon icon-filter me-2"></i>Find Your Space
        </h4>
        <button className="btn btn-sm btn-light" onClick={clearFilters}>
          <FaUndo className="me-1" /> Reset
        </button>
      </div>

      {/* Interactive Pill Buttons for Space Type */}
      <div className="mb-4">
        <label className="form-label fw-bold">Space Type</label>
        <div className="filter-pills d-flex flex-wrap gap-2">
          <button
            onClick={() => handleSpaceTypeClick("all")}
            className={`btn ${filters.spaceType === "all" ? "active" : ""}`}
          >
            All Types
          </button>
          {spaceTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleSpaceTypeClick(type)}
              className={`btn ${filters.spaceType === type ? "active" : ""}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="row g-3">
        {/* Seats */}
        <div className="col-md-6">
          <label htmlFor="seats" className="form-label fw-bold">
            Number of Seats
          </label>
          <div className="input-group styled-input-group">
            <span className="input-group-text">
              <FaUsers />
            </span>
            <input
              type="number"
              id="seats"
              name="seats"
              className="form-control"
              min="1"
              value={filters.seats}
              onChange={handleInputChange}
              placeholder="e.g., 5"
            />
          </div>
        </div>

        {/* 4. Price Range Dropdown (Replaces Slider) */}
        <div className="col-md-6">
          <label htmlFor="priceRange" className="form-label fw-bold">
            Price per Seat
          </label>
          <div className="input-group styled-input-group">
            <span className="input-group-text">
              <FaRupeeSign />
            </span>
            <select
              id="priceRange"
              name="priceRange"
              className="form-select"
              value={filters.priceRange}
              onChange={handleInputChange}
            >
              <option value="any">Any Price</option>
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
