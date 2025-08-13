"use client";
import React, { useState } from "react";

export default function PropertyDescription({ propertyItem }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <h5 className="fw-6 title">Description</h5>
      <p className="text-variant-1">
        This coworking space is in Pune’s prime corporate spot. It houses tons
        of amenities with a seating capacity of more than 1000+ seats, providing
        private cabins, conference rooms, meeting rooms, a live kitchen, a
        lounge, and play zones to cater to all the needs of the occupiers. There
        is also a provision of proper dedicated parking spaces for the
        occupiers. All the workstations/ dedicated desks are fully furnished and
        functional, equipped with voice and lan ports, redundant ports, etc
        which will help occupiers to work in comfort without any hassles.
      </p>

      {/* Wrap the hidden section in a sliding div */}
      <div className={`slide-container ${showMore ? "open" : ""}`}>
        <p className="mt-8 text-variant-1">
          The spaces provided are managed by the team on a daily basis and
          provide all the essential amenities with on-demand services for its
          driving workforce and businesses. These office spaces may be the
          incubator for your next-gen ideas for startups and all types of
          businesses. All our properties and spaces are situated at prime
          locations of the city and in near vicinity to all the civic needs.
          Located in Pune’s commercial destination, this coveted center offers a
          professional coworking environment with cutting-edge services. It has
          proximity to restaurants, retail stores, and shops. While being
          strategically located one can enjoy a plethora of services to their
          heart’s content. The working experience here is enhanced by its
          proximity to the Public Bus Transport and Highway.
        </p>
      </div>

      <a
        href="#"
        className="btn-view"
        onClick={(e) => {
          e.preventDefault();
          setShowMore(!showMore);
        }}
      >
        <span className="text">{showMore ? "View Less" : "View More"}</span>
      </a>
    </>
  );
}
