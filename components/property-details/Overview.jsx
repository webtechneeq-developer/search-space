import React from "react";
// 1. Import the specific icons you need from react-icons
import {
  FaBuilding,
  FaChair,
  FaStreetView,
  FaUsers,
  FaEnvelope,
  FaTicketAlt,
  FaCheckCircle,
} from "react-icons/fa";

// 2. Map your space types to the imported icon components
const typeIconMap = {
  "Private Office": FaBuilding,
  "Dedicated Desk": FaChair,
  "Flexi Desk": FaStreetView,
  "Meeting Room": FaUsers,
  "Virtual Office": FaEnvelope,
  "Day Pass": FaTicketAlt,
  default: FaCheckCircle, // A fallback icon
};

export default function Overview({ propertyItem }) {
  const availableSpaces = propertyItem?.pricing || [];
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN").format(value);

  return (
    <>
      <h6 className="title fw-6">Available Spaces</h6>
      <div className="row mt-3">
        {availableSpaces.map((space) => {
          // Get the correct Icon Component from the map
          const IconComponent = typeIconMap[space.type] || typeIconMap.default; // Corrected a typo here

          return (
            <div className="col-lg-6 mb-3" key={space.type}>
              <div className="d-flex align-items-center p-3 border rounded h-100 overview-item-card">
                <div className="box-icon w-52">
                  {/* Render the Icon Component with a specific size */}
                  <IconComponent
                    className="icon"
                    style={{ width: "25px", height: "25px" }}
                  />
                </div>
                <div className="content ms-3">
                  <h6 className="fw-bold mb-1">{space.type}</h6>
                  <p className="text-muted mb-0 small">
                    <span className="text-primary fw-semibold">
                      {" "}
                      {/* Changed back to text-primary for better visibility */}
                      ₹{formatCurrency(space.price)}
                      {space.unit}
                      {space.seats && ` | ${space.seats} Seats`}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
