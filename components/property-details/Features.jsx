const featureGroups = [
  [
    "Smoke alarm",
    "Carbon monoxide alarm",
    "First aid kit",
    "Self check-in with lockbox",
    "Security cameras",
  ],
  [
    "Hangers",
    "Bed linens",
    "Extra pillows & blankets",
    "Iron",
    "TV with standard cable",
  ],
  ["Refrigerator", "Microwave", "Dishwasher", "Coffee maker"],
];

export default function Features({ propertyItem }) {
  console.log("Get me Feature", propertyItem);

  const PropertyFeatures = propertyItem?.features;
  return (
    <>
      <h5 className="title fw-6">Amenities and features</h5>
      <div className="wrap-feature">
        <div className="box-feature">
          <ul>
            {PropertyFeatures.map((feature, idx) => (
              <li className="feature-item" key={idx}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
