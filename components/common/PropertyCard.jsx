// components/common/PropertyCard.jsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

const PropertyCard = ({ property }) => {
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN").format(value);

  return (
    <div className="col-12 mb-4">
      <div className="card">
        <div className="row g-0">
          <div className="col-md-4">
            <Image
              src={property.imgSrc}
              className="img-fluid rounded-start"
              alt={property.title}
              width={400}
              height={400}
              style={{ objectFit: "cover", height: "100%" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{property.title}</h5>
              <p className="card-text">
                <small className="text-muted">{property.workingHours}</small>
              </p>
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {property.pricing.map((item, index) => (
                    <tr key={index}>
                      <td>{item.type}</td>
                      <td>
                        ₹{formatCurrency(item.price)} {item.unit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link
                // UPDATE THIS LINK
                href={`/${property.typeSlug}/${property.citySlug}/${property.localitySlug}/${property.slug}`}
                className="btn btn-primary"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
