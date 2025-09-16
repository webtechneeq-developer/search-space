// components/properties/Properties3.jsx
"use client";
import React, { useEffect, useReducer, useRef } from "react";
// ... other imports
import { initialState, reducer } from "@/context/propertyFilterReducer";

export default function Properties3({ propertiesData = [] }) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    filtered: propertiesData,
    sorted: propertiesData,
  });

  // ... (keep the rest of your component logic for sorting, pagination etc.)
  // Make sure your useEffect hooks that depend on the property list use `propertiesData`
  // as a dependency.

  useEffect(() => {
    // This effect should re-run if the initial data from the page changes
    dispatch({ type: "SET_FILTERED", payload: propertiesData });
  }, [propertiesData]);

  const {
    // ...
    sorted,
    currentPage,
    itemPerPage,
  } = state;

  const currentItems = sorted.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  return (
    <>
      {/* ... your JSX ... */}
      <div className="row">
        {currentItems.length > 0 ? (
          currentItems.map((elm, i) => (
            <div key={i} className="col-xl-4 col-lg-6 col-md-6">
              {/* Your property card component */}
              <div className="homelengo-box">
                {/* ... */}
                <h6>{elm.title}</h6>
                {/* ... */}
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No properties found for this selection.</p>
          </div>
        )}
      </div>
      {/* ... Pagination and other JSX ... */}
    </>
  );
}
