import React from "react";

// Map your space types to the icon classes from your template's icon font
const typeIconMap = {
  "Private Office": "icon-house-line",
  "Dedicated Desk": "icon-house-line",
  "Flexi Desk": "icon-house-line",
  "Meeting Room": "icon-house-line",
  "Virtual Office": "icon-house-line",
  "Day Pass": "icon-house-line",
  default: "icon-house-line", // A fallback icon
};

export default function Overview({ propertyItem }) {
  // Get the list of available spaces from the 'pricing' array in your data
  const availableSpaces = propertyItem?.pricing || [];

  return (
    <>
      <h6 className="title fw-6">Available Spaces</h6>

      {/* Use the ul with the .info-box class your CSS is targeting */}
      <ul className="info-box mt-3">
        {availableSpaces.map((space) => (
          // Each item is an li with the .item class
          <li className="item" key={space.type}>
            <div className="box-icon w-52">
              <i
                className={`icon ${
                  typeIconMap[space.type] || typeIconMap.default
                }`}
              />
            </div>
            <div className="content">
              {/* The CSS styles the label and the value differently */}
              <span className="label">Available</span>
              <span>{space.type}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
