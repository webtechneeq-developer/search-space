"use client";

import React, { useState, useRef, useEffect } from "react";

const Readmore = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    setHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : "0px");
  }, [isExpanded]);

  const paragraph1 = `Search Spaces is India’s premier coworking aggregator, offering flexible workspace solutions across Mumbai, Navi Mumbai & Pune. Whether you’re a freelancer, startup, or enterprise, we help you find private offices, dedicated desks, flexi desks, day passes, meeting rooms, and more — all in your preferred location, at transparent rates, with zero brokerage.`;

  return (
    <section className="readmore01">
      <div className="container">
        <div style={{ margin: "0px auto", lineHeight: "1.6" }}>
          <h2 style={{ fontSize: "14px" }}>About Search Spaces</h2>
          <p>{paragraph1}</p>

          <div
            ref={contentRef}
            style={{
              height: height,
              overflow: "hidden",
              transition: "height 0.5s ease",
            }}
          >
            <br></br>
            <p><b className="readmoreinnertext-title">Private Office :</b> Ideal for small teams or companies that need privacy, branding, and control.</p>
            <br></br>
            <p><b className="readmoreinnertext-title">Dedicated Desk :</b> Best if you need your own dedicated space but still want to be in a coworking environment.</p>
            <br></br>
            <p><b className="readmoreinnertext-title">Flexi Desk :</b> For those who don’t required a fixed seat — great for flexibility and cost savings.</p>
            <br></br>
            <p><b className="readmoreinnertext-title">Day Pass :</b> Perfect for travellers, occasional users, freelancers or remote workers that need professional space for a few hours or a day.</p>
            <br></br>
            <p><b className="readmoreinnertext-title">Meeting Room :</b> Use when you have client meetings, presentations, team meetings or workshops. We provide all amenities like video conferencing, projectors, and catering options.</p>
            <br></br>
            <p>The best coworking meeting room in Mumbai includes amenities like video conferencing, comfortable seating, projector/TV screens, fast internet, and refreshments.</p>
            <br></br>
            <p>Whether you're looking for a co-working dedicated desk, co-working flexi desk, occasional day pass access, or meeting rooms, Search Spaces will help you to find best coworking across Mumbai, Navi Mumbai and Pune.</p>
          </div>
          <div className="read-more">
            <button
              onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Readmore;
