// components/property-details/Details.jsx
import React from "react";
import Image from "next/image";

export default function Details({ propertyItem }) {
  // Array of details to display, making it easy to add or remove items
  const detailItems = [
    {
      label: "City",
      value: propertyItem.city,
      icon: "/images/icons/city.svg",
    },
    {
      label: "Location",
      value: propertyItem.subLocation,
      icon: "/images/icons/map-pin.svg",
    },
    {
      label: "Working Hours",
      value: propertyItem.workingHours,
      icon: "/images/icons/clock.svg",
    },
    {
      label: "Lock-in Period",
      value: propertyItem.lockInPeriod,
      icon: "/images/icons/lock.svg",
    },
    {
      label: "Security Deposit",
      value: propertyItem.securityDeposit,
      icon: "/images/icons/shield.svg",
    },
    {
      label: "Advance Payment",
      value: propertyItem.advancePayment,
      icon: "/images/icons/cash.svg",
    },
    {
      label: "Notice Period",
      value: propertyItem.noticePeriod,
      icon: "/images/icons/calendar.svg",
    },
  ];

  return (
    <div className="row">
      {detailItems.map((item) => (
        // Render each detail item in a 2-column grid
        <div key={item.label} className="col-md-6 mb-4">
          <div className="d-flex align-items-center">
            <div
              className="flex-shrink-0 d-flex justify-content-center align-items-center me-3"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#f8f9fa",
                borderRadius: "50%",
              }}
            >
              <Image src={item.icon} alt={item.label} width={22} height={22} />
            </div>
            <div className="flex-grow-1">
              <span
                className="d-block text-secondary"
                style={{ fontSize: "14px" }}
              >
                {item.label}
              </span>
              <span className="fw-6 text-capitalize">
                {item.value || "N/A"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
