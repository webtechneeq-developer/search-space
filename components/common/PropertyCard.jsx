"use client";

import React, { useId } from "react";
import Link from "next/link";
import { FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";

const PropertyCard = ({ property }) => {
  // Generates a unique ID for the carousel on each card
  const carouselId = `carousel-${useId()}`;

  // Helper function to capitalize city/location names
  const capitalizeFirstLetter = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  // Fallback logic for images
  const images =
    property.singlePageImgSrc?.length > 0
      ? property.singlePageImgSrc
      : [property.imgSrc || "/images/placeholder.jpg"]; // Default placeholder if all else fails

  // Formats numbers into Indian currency style
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN").format(value);

  // Constructs the detail page URL from the property's slugs
  const detailUrl = `/${property.typeSlug}/${property.citySlug}/${property.localitySlug}/${property.slug}`;

  // Finds the lowest price to display
  const startingPrice =
    property.pricing?.length > 0
      ? Math.min(...property.pricing.map((p) => p.price))
      : null;

  return (
    <div className="col-12 col-sm-6 col-lg-4 mb-4">
      <div
        className="card border-0 shadow-sm h-100"
        style={{
          borderRadius: "15px",
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.07)";
        }}
      >
        {/* Bootstrap Carousel for Images */}
        <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
          <div
            className="carousel-inner"
            style={{
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
            }}
          >
            {images.map((img, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <img
                  src={img}
                  className="d-block w-100"
                  alt={`${property.title} image ${index + 1}`}
                  style={{
                    height: "250px",
                    objectFit: "cover",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                  }}
                />
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#${carouselId}`}
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#${carouselId}`}
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
              </button>
            </>
          )}
        </div>

        {/* Card Body */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-truncate fw-bold">{property.title}</h5>
          <p className="card-text text-muted mb-2 d-flex align-items-center small">
            <FaMapMarkerAlt className="me-2 text-danger" />
            {capitalizeFirstLetter(property.subLocation)},{" "}
            {capitalizeFirstLetter(property.city)}
          </p>

          <div className="mt-auto">
            {startingPrice !== null && (
              <div className="bg-light rounded p-2 mb-3 d-flex justify-content-between align-items-center">
                <span className="text-muted small">Starting from</span>
                <div className="text-primary fw-bold d-flex align-items-center fs-5">
                  <FaRupeeSign
                    className="me-1"
                    style={{ fontSize: "0.9rem" }}
                  />
                  {formatCurrency(startingPrice)}
                </div>
              </div>
            )}

            <Link
              href={detailUrl}
              className="btn btn-primary w-100 fw-semibold"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
