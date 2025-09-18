import React from "react";

export default function MapLocation({ propertyItem }) {
  // Use the map link from your data, or a static default map
  const mapUrl =
    propertyItem.map ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119064.42879551428!2d72.79093341951556!3d19.08252232493351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1689168194481!5m2!1sen!2sin";

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
