"use client";

import React, { useState, useRef, useEffect } from "react";

const Readmore = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    setHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : "0px");
  }, [isExpanded]);

  const paragraph1 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
  const paragraph2 = `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  return (
    <div style={{ maxWidth: "1280px", margin: "20px auto", lineHeight: "1.6" }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "15px" }}>About Search Spaces</h2>
      <p>{paragraph1}</p>

      <div
        ref={contentRef}
        style={{
          height: height,
          overflow: "hidden",
          transition: "height 0.5s ease",
        }}
      >
        <p>{paragraph2}</p>
      </div>
        <div className="read-more">
          <button
            onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Read Less" : "Read More"}
          </button>
      </div>
    </div>
  );
};

export default Readmore;
