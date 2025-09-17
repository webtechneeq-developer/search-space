import React from "react";

export default function PropertyDescription({ propertyItem }) {
  return (
    <div>
      <h4 className="title-mb">Description</h4>
      <p className="text">
        {propertyItem.description ||
          "A modern and fully-equipped workspace designed for productivity and collaboration. Contact us for more details about this excellent facility."}
      </p>
    </div>
  );
}
