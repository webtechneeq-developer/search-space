// components/property-details/PropertyDetailsTitle.jsx
import React from "react";

export default function PropertyDetailsTitle({ propertyItem }) {
  // Find the lowest price to display as "Starting from"
  const startingPrice = Math.min(...propertyItem.pricing.map((p) => p.price));
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN").format(value);

  return (
    <div className="flat-section-v4">
      <div className="container">
        <div className="header-property-detail">
          <div className="content-top d-flex justify-content-between align-items-center flex-wrap">
            <h3 className="title link fw-8">{propertyItem.title}</h3>
            <div className="box-price d-flex align-items-end">
              <h3 className="fw-8">
                <small
                  className="body-1 text-variant-1"
                  style={{ paddingRight: "10px" }}
                >
                  Starting From
                </small>
                ₹{formatCurrency(startingPrice)}
              </h3>
              <span className="body-1 text-variant-1">/month</span>
            </div>
          </div>
          <div className="content-bottom mt-2">
            <div className="info-box">
              <div className="label"></div>
              <p className="meta-item">
                <span className="icon icon-mapPin" />
                <span className="text-variant-1 text-capitalize">
                  {propertyItem.subLocation}, {propertyItem.city}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
