"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { allProperties } from "@/data/properties";

export default function LocationGrid({ title, locations }) {
  // Helper: Capitalize first letter of each word
  const capitalizeWords = (str) =>
    str
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  // Helper: Get image for a location (based on city or subLocation match)
  const getImageForLocation = (locationName) => {
    const match = allProperties.find(
      (p) =>
        p.citySlug?.toLowerCase() === locationName.toLowerCase() ||
        p.subLocation?.toLowerCase() === locationName.toLowerCase()
    );
    return match?.imgSrc || "/images/location/navi-mumbai-location.webp"; // fallback image
  };

  return (
    <section className="flat-location container py-5">
      <div className="box-title text-center wow fadeInUp">
        <h3 className="mt-4 title new-title">{title}</h3>
      </div>

      <div className="row mt-4 wow fadeInUp" data-wow-delay=".2s">
        {locations.map((loc, index) => {
          const count = loc.propertyCount;
          const imageSrc = getImageForLocation(loc.name);

          return (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <Link href={loc.url} className="box-location">
                <div className="image img-style">
                  <Image
                    className="lazyload"
                    src={imageSrc}
                    alt={loc.name}
                    width={465}
                    height={578}
                  />
                </div>
                <div className="content card-box">
                  <div className="inner-left">
                    <h6 className="title text-capitalize link mb-0">
                      {capitalizeWords(loc.name)}
                    </h6>
                    <small className="text-muted">
                      {count} {count === 1 ? "property" : "properties"}
                    </small>
                  </div>
                  <button className="explore-btn">
                    <a href="#">
                      Explore
                    </a>
                  </button>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
