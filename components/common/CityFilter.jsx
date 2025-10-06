"use client";
import React from "react";
import { FaUndo, FaUsers } from "react-icons/fa";

// Data for our interactive pill buttons
const spaceTypes = [
    "Private Office",
    "Dedicated Desk",
    "Flexi Desk",
    "Meeting Room",
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
            maxPrice: 1000, // Resets price to the initial minimum
            lockInPeriod: "any",
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

                {/* Price Range */}
                <div className="col-6 mt-3">
                    <label htmlFor="maxPrice" className="form-label filter-range-label">
                        Max Price per Seat:{" "}
                        <span className="price-value">
                            ₹{Number(filters.maxPrice).toLocaleString()}
                        </span>
                    </label>
                    <input
                        type="range"
                        id="maxPrice"
                        name="maxPrice"
                        className="form-range"
                        min="1000"
                        max="50000"
                        step="1000"
                        // This `value` prop makes this a "controlled component".
                        // Its visual position is always determined by the `filters.maxPrice` state.
                        value={filters.maxPrice}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
}