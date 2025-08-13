import React from "react";

export default function MapLocation({ propertyItem }) {
  return (
    <>
      <h5 className="title fw-6">Map location</h5>
      <iframe
        className="map"
        src={propertyItem.map}
        width="100%"
        height={478}
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="info-map">
        <ul className="box-left">
          <li>
            <span className="label fw-6">Address</span>
            <div className="text text-variant-1">{propertyItem.address}</div>
          </li>
          <li>
            <span className="label fw-6">City</span>
            <div className="text text-variant-1">{propertyItem.city}</div>
          </li>
          <li>
            <span className="label fw-6">State/county</span>
            <div className="text text-variant-1">$7,500</div>
          </li>
        </ul>
        <ul className="box-right">
          <li>
            <span className="label fw-6">Postal code</span>
            <div className="text text-variant-1">7.328</div>
          </li>
          <li>
            <span className="label fw-6">Area</span>
            <div className="text text-variant-1">7.328</div>
          </li>
          <li>
            <span className="label fw-6">Country</span>
            <div className="text text-variant-1">2024</div>
          </li>
        </ul>
      </div>
    </>
  );
}
