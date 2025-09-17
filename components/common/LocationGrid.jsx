"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function LocationGrid({ title, locations }) {
  return (
    <section className="flat-location container py-5">
      <div className="box-title text-center wow fadeInUp">
        <h3 className="mt-4 title">{title}</h3>
      </div>

      <div className="row mt-4 wow fadeInUp" data-wow-delay=".2s">
        {locations.map((loc, index) => {
          const count = loc.propertyCount;

          return (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <Link href={loc.url} className="box-location">
                <div className="image img-style">
                  <Image
                    className="lazyload"
                    src="/images/location/location-1.jpg" // You can update to dynamic later
                    alt={loc.name}
                    width={465}
                    height={578}
                  />
                </div>
                <div className="content">
                  <div className="inner-left">
                    <h6 className="title text-capitalize link mb-0">
                      {loc.name}
                    </h6>
                    <small className="text-muted">
                      {count} {count === 1 ? "property" : "properties"}
                    </small>
                  </div>
                  <button className="box-icon line w-44 round">
                    <i className="icon icon-arrow-right2" />
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
