"use client";
import React, { useState } from "react";

export default function Description() {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <h5 className="fw-6 title">Description</h5>
      <p className="text-variant-1">
        Located around an hour away from, between the Perche and the Iton
        valley, in a beautiful wooded park bordered by a charming stream, this
        country property immediately seduces with its bucolic and soothing
        environment.
      </p>

      {/* Wrap the hidden section in a sliding div */}
      <div className={`slide-container ${showMore ? "open" : ""}`}>
        <p className="mt-8 text-variant-1">
          An ideal choice for sports and leisure enthusiasts who will be able to
          take advantage of its swimming pool (11m x 5m), tennis court, gym and
          sauna.
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
