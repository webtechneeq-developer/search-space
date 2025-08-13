export default function Details({ propertyItem }) {
  const items = [
    { label: "ID:", content: propertyItem.id },
    { label: "Beds", content: "7.328" },
    { label: "Price", content: propertyItem.price },
    { label: "Year built", content: "2024" },
    { label: "Size", content: "150 sqft" },
    { label: "Type", content: propertyItem.type },
    { label: "Rooms", content: "9" },
    { label: "Status", content: "For sale" },
    { label: "Baths", content: "3" },
    { label: "Garage", content: "1" },
  ];

  return (
    <>
      {" "}
      <h5 className="title fw-6">Property Details</h5>
      <div className="row">
        {items.map((item, index) => (
          <div className="col-md-6" key={index}>
            <div className="inner-box">
              <span className="label text-black-3">{item.label}</span>
              <div className="content text-black-3">{item.content}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
