// app/[type]/[city]/[locality]/[slug]/page.jsx
import React from "react";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";
import Image from "next/image";
import { allProperties } from "@/data/properties";

// This function generates all possible URLs for your property pages
export async function generateStaticParams() {
  return allProperties.map((property) => ({
    type: property.typeSlug,
    city: `${property.citySlug}`,
    locality: `${property.localitySlug}`,
    slug: property.slug,
  }));
}

const formatCurrency = (value) => new Intl.NumberFormat("en-IN").format(value);

export default function PropertyDetailPage({ params }) {
  const property = allProperties.find((p) => p.slug === params.slug);

  if (!property) {
    return <div>Property not found!</div>;
  }

  return (
    <>
      <Header1 />
      <div className="container my-5">
        <h1 className="mb-4">{property.title}</h1>
        <div className="row">
          <div className="col-lg-8">
            <Image
              src={property.singlePageImgSrc[0]}
              alt={property.title}
              width={800}
              height={600}
              className="img-fluid rounded mb-4"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="col-lg-4">
            <h4>Details</h4>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>City:</strong>
                <span>{property.city}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Location:</strong>
                <span className="text-capitalize">{property.subLocation}</span>
              </li>
              <li className="list-group-item">
                <strong>Working Hours:</strong>
                <p className="mb-0 mt-1">{property.workingHours}</p>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Lock-in Period:</strong>
                <span>{property.lockInPeriod}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Security Deposit:</strong>
                <span>{property.securityDeposit}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Advance Payment:</strong>
                <span>{property.advancePayment}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Notice Period:</strong>
                <span>{property.noticePeriod}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-5">
          <h3>Pricing Options</h3>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Type</th>
                  <th scope="col">Price</th>
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
          </div>
        </div>
      </div>
      <Footer1 />
    </>
  );
}
