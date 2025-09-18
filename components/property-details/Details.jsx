import React from "react";
// 1. Import the necessary icons from react-icons
import {
  FaCity,
  FaMapMarkerAlt,
  FaClock,
  FaLock,
  FaShieldAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";

export default function Details({ propertyItem }) {
  // 2. Update the array to use the imported icon components directly
  const detailItems = [
    {
      label: "City",
      value: propertyItem.city,
      Icon: FaCity,
    },
    {
      label: "Location",
      value: propertyItem.subLocation,
      Icon: FaMapMarkerAlt,
    },
    {
      label: "Working Hours",
      value: propertyItem.workingHours,
      Icon: FaClock,
    },
    {
      label: "Lock-in Period",
      value: propertyItem.lockInPeriod,
      Icon: FaLock,
    },
    {
      label: "Security Deposit",
      value: propertyItem.securityDeposit,
      Icon: FaShieldAlt,
    },
    {
      label: "Advance Payment",
      value: propertyItem.advancePayment,
      Icon: FaMoneyBillWave,
    },
    {
      label: "Notice Period",
      value: propertyItem.noticePeriod,
      Icon: FaCalendarAlt,
    },
  ];

  return (
    <div className="row">
      {detailItems.map((item) => (
        <div key={item.label} className="col-md-6 mb-3">
          <div className="d-flex align-items-center p-3 rounded-3 h-100 detail-item-card">
            <div
              className="flex-shrink-0 d-flex justify-content-center align-items-center me-3 "
              style={
                {
                  // width: "50px", // Increased size for a better look
                  // height: "50px",
                  // backgroundColor: "#f8f9fa",
                  // borderRadius: "50%",
                }
              }
            >
              {/* 3. Render the Icon component dynamically */}
              <item.Icon style={{ width: "25px", height: "25px" }} />
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
