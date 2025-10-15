import React from "react";

export default function MapLocation({ propertyItem }) {
  // Use the map link from your data, or a static default map
  const mapUrl = propertyItem.map;

  return (
    <div className="flat-map-v2 mt-4">
      <iframe
        className="map-content"
        src={mapUrl}
        width="100%"
        height="450"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
