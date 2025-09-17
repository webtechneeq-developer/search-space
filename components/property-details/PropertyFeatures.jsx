import React from "react";

export default function PropertyFeatures({ propertyItem }) {
  const features = propertyItem?.features || [
    "High Speed Wifi",
    "Meeting Rooms",
    "Printer",
    "Pantry",
    "Car / Bike Parking",
    "Reception",
    "Air Condition",
    "Tea / Coffee",
    "Phone Booth",
    "Lounge",
    "Projector",
    "Scanner & Printer",
    "Podium",
  ];

  // Distribute features into 3 columns
  const numFeatures = features.length;
  const col1 = features.slice(0, Math.ceil(numFeatures / 3));
  const col2 = features.slice(
    Math.ceil(numFeatures / 3),
    Math.ceil(numFeatures / 3) * 2
  );
  const col3 = features.slice(Math.ceil(numFeatures / 3) * 2);

  // Helper function to render a single column's list
  const renderFeatureColumn = (featureList) => (
    <ul className="feature-list">
      {/* Using list-unstyled to remove default bullets if needed, or remove if you want default bullets */}
      {featureList.map((feature, idx) => (
        <li key={idx} className="feature-item mb-2 mt-2">
          {/* Added mb-2 for spacing between items */}
          {feature}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* <h5 className="title fw-6">Amenities And Features</h5> */}
      <div className="wrap-feature">
        <div className="box-feature row">
          <div className="col-md-4 col-sm-6">{renderFeatureColumn(col1)}</div>
          <div className="col-md-4 col-sm-6">{renderFeatureColumn(col2)}</div>
          <div className="col-md-4 col-sm-6">{renderFeatureColumn(col3)}</div>
        </div>
      </div>
    </>
  );
}
