import React from "react";
// 1. Import icons from react-icons
import {
  FaWifi,
  FaUsers,
  FaPrint,
  FaMugHot,
  FaParking,
  FaConciergeBell,
  FaBroom,
  FaPhone,
  FaCouch,
  FaChair,
  FaVideo,
  FaCheckCircle,
} from "react-icons/fa";

// 2. Map feature strings to the imported icon components
const featureIconMap = {
  "High Speed Wifi": FaWifi,
  "Meeting Rooms": FaUsers,
  Printer: FaPrint,
  "Scanner & Printer": FaPrint,
  Pantry: FaMugHot,
  "Car / Bike Parking": FaParking,
  Reception: FaConciergeBell,
  Housekeeping: FaBroom,
  "Air Condition": FaBroom, // You can find a better icon e.g., from bs-icons
  "Tea / Coffee": FaMugHot,
  "Phone Booth": FaPhone,
  Lounge: FaCouch,
  Projector: FaVideo,
  Podium: FaVideo, // Reusing icon
  "Ergo Workstations": FaChair,
  default: FaCheckCircle,
};

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
  ];

  const numFeatures = features.length;
  const col1 = features.slice(0, Math.ceil(numFeatures / 3));
  const col2 = features.slice(
    Math.ceil(numFeatures / 3),
    Math.ceil(numFeatures / 3) * 2
  );
  const col3 = features.slice(Math.ceil(numFeatures / 3) * 2);

  const renderFeatureColumn = (featureList) => (
    <ul className="list-unstyled">
      {featureList.map((feature, idx) => {
        const IconComponent = featureIconMap[feature] || featureIconMap.default;
        return (
          <li key={idx} className="feature-item d-flex align-items-center my-3">
            <IconComponent
              className="text-primary me-2"
              style={{ width: "20px", height: "20px" }}
            />
            <span>{feature}</span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <div className="wrap-feature">
        <div className="box-feature row mt-3">
          <div className="col-md-4 col-sm-6">{renderFeatureColumn(col1)}</div>
          <div className="col-md-4 col-sm-6">{renderFeatureColumn(col2)}</div>
          <div className="col-md-4 col-sm-6">{renderFeatureColumn(col3)}</div>
        </div>
      </div>
    </>
  );
}
