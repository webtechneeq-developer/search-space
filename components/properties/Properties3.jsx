"use client";
import React, { useEffect, useReducer, useRef, useState } from "react";
import DropdownSelect from "../common/DropdownSelect";
import Link from "next/link";
import Image from "next/image";
import Pagination from "../common/Pagination";
import AdvanceSearch2 from "../common/AdvanceSearch2";
import RandomBanner from "../common/RamdomBanner";
import { initialState, reducer } from "@/context/propertyFilterReducer";
import { allProperties } from "@/data/demoProporties";

export default function Properties3({ propertiesData }) {
  // Use useReducer for state management
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    filtered: propertiesData,
    sorted: propertiesData,
  });

  const ddContainer = useRef();
  const advanceBtnRef = useRef();

  const {
    price,
    size,
    rooms,
    bedrooms,
    bathrooms,
    features,
    filtered,
    sortingOption,
    sorted,
    currentPage,
    itemPerPage,
  } = state;

  const formatIndianCurrency = (value) => {
    if (value === null || value === undefined) return "N/A";
    return new Intl.NumberFormat("en-IN").format(value);
  };

  const clearFilter = () => {
    dispatch({ type: "CLEAR_FILTER" });
  };

  // Main filtering logic, now based on the `propertiesData` prop
  useEffect(() => {
    let filteredResults = [...propertiesData];

    // Apply additional filters
    if (features.length) {
      filteredResults = filteredResults.filter((elm) =>
        features.every((el) => elm.features.includes(el))
      );
    }
    if (rooms !== "All") {
      filteredResults = filteredResults.filter((elm) => rooms === elm.beds);
    }
    if (bedrooms !== "All") {
      filteredResults = filteredResults.filter((elm) => bedrooms === elm.beds);
    }
    if (bathrooms !== "All") {
      filteredResults = filteredResults.filter(
        (elm) => bathrooms === elm.baths
      );
    }
    if (price[0] !== 0 || price[1] !== 1000000) {
      filteredResults = filteredResults.filter(
        (elm) => elm.price >= price[0] && elm.price <= price[1]
      );
    }
    // You have no sqft in your provided data, so this will always be false
    // if (size[0] !== 0 || size[1] !== 100000) {
    //   filteredResults = filteredResults.filter(
    //     (elm) => elm.sqft >= size[0] && elm.sqft <= size[1]
    //   );
    // }

    dispatch({ type: "SET_FILTERED", payload: filteredResults });
  }, [propertiesData, price, size, rooms, bedrooms, bathrooms, features]);

  // Sorting logic
  useEffect(() => {
    let sortedList = [...filtered];
    if (sortingOption === "Price Ascending") {
      sortedList.sort((a, b) => a.price - b.price);
    } else if (sortingOption === "Price Descending") {
      sortedList.sort((a, b) => b.price - a.price);
    }
    dispatch({ type: "SET_SORTED", payload: sortedList });
    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
  }, [filtered, sortingOption]);

  const allProps = {
    price,
    setPrice: (newPrice) => dispatch({ type: "SET_PRICE", payload: newPrice }),
    size,
    setSize: (newSize) => dispatch({ type: "SET_SIZE", payload: newSize }),
    setRooms: (newRooms) => dispatch({ type: "SET_ROOMS", payload: newRooms }),
    setBedrooms: (newBedrooms) =>
      dispatch({ type: "SET_BEDROOMS", payload: newBedrooms }),
    setBathrooms: (newBathrooms) =>
      dispatch({ type: "SET_BATHROOMS", payload: newBathrooms }),
    features,
    setFeatures: (newFeature) => {
      const updated = [...features].includes(newFeature)
        ? [...features].filter((elm) => elm !== newFeature)
        : [...features, newFeature];
      dispatch({ type: "SET_FEATURES", payload: updated });
    },
  };

  const currentItems = sorted.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  return (
    <>
      <section className="flat-map">
        <div id="map" className="top-map">
          <RandomBanner />
        </div>
        <div className="container">
          <div className="wrap-filter-search">
            <div className="form-sl">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="wd-find-select shadow-3">
                  <div className="inner-group"></div>
                  <div className="box-btn-advanced">
                    <div className="form-group-4 box-filter">
                      <a
                        className="tf-btn btn-line filter-advanced pull-right"
                        onClick={() =>
                          ddContainer.current.classList.toggle("show")
                        }
                        ref={advanceBtnRef}
                      >
                        <span className="text-1">Search advanced</span>
                        <svg
                          width={22}
                          height={22}
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.5 12.375V3.4375M5.5 12.375C5.86467 12.375 6.21441 12.5199 6.47227 12.7777C6.73013 13.0356 6.875 13.3853 6.875 13.75C6.875 14.1147 6.73013 14.4644 6.47227 14.7223C6.21441 14.9801 5.86467 15.125 5.5 15.125M5.5 12.375C5.13533 12.375 4.78559 12.5199 4.52773 12.7777C4.26987 13.0356 4.125 13.3853 4.125 13.75C4.125 14.1147 4.26987 14.4644 4.52773 14.7223C4.78559 14.9801 5.13533 15.125 5.5 15.125M5.5 15.125V18.5625M16.5 12.375V3.4375M16.5 12.375C16.8647 12.375 17.2144 12.5199 17.4723 12.7777C17.7301 13.0356 17.875 13.3853 17.875 13.75C17.875 14.1147 17.7301 14.4644 17.4723 14.7223C17.2144 14.9801 16.8647 15.125 16.5 15.125M16.5 12.375C16.1353 12.375 15.7856 12.5199 15.5277 12.7777C15.2699 13.0356 15.125 13.3853 15.125 13.75C15.125 14.1147 15.2699 14.4644 15.5277 14.7223C15.7856 14.9801 16.1353 15.125 16.5 15.125M16.5 15.125V18.5625M11 6.875V3.4375M11 6.875C11.3647 6.875 11.7144 7.01987 11.9723 7.27773C12.2301 7.53559 12.375 7.88533 12.375 8.25C12.375 8.61467 12.2301 8.96441 11.9723 9.22227C11.7144 9.48013 11.3647 9.625 11 9.625M11 6.875C10.6353 6.875 10.2856 7.01987 10.0277 7.27773C9.76987 7.53559 9.625 7.88533 9.625 8.25C9.625 8.61467 9.76987 8.96441 10.0277 9.22227C10.2856 9.48013 10.6353 9.625 11 9.625M11 9.625V18.5625"
                            stroke="#161E2D"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </div>
                    <button type="submit" className="tf-btn btn-search primary">
                      Search <i className="icon icon-search" />
                    </button>
                  </div>
                </div>
                <div ref={ddContainer} className="wd-search-form">
                  <AdvanceSearch2
                    clearFilter={clearFilter}
                    allProps={allProps}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="flat-section flat-recommended">
        <div className="container">
          <div className="box-title-listing">
            <div className="box-left">
              <h3 className="fw-8">Property Listing</h3>
              <p className="text">
                There are currently {sorted.length} properties.
              </p>
            </div>
            <div className="box-filter-tab">
              <ul className="nav-tab-filter" role="tablist">
                <li className="nav-tab-item" role="presentation">
                  <a
                    href="#gridLayout"
                    className="nav-link-item active"
                    data-bs-toggle="tab"
                  >
                    {/* ... SVG for grid layout ... */}
                  </a>
                </li>
                <li className="nav-tab-item" role="presentation">
                  <a
                    href="#listLayout"
                    className="nav-link-item"
                    data-bs-toggle="tab"
                  >
                    {/* ... SVG for list layout ... */}
                  </a>
                </li>
              </ul>
              <DropdownSelect
                onChange={(value) => {
                  const match = value.match(/\d+/);
                  if (match) {
                    dispatch({
                      type: "SET_ITEM_PER_PAGE",
                      payload: parseInt(match[0], 10),
                    });
                    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
                  }
                }}
                addtionalParentClass="list-page"
                options={["Show: 6", "Show: 9", "Show: 12"]}
              />
              <DropdownSelect
                onChange={(value) =>
                  dispatch({ type: "SET_SORTING_OPTION", payload: value })
                }
                addtionalParentClass="list-sort"
                options={[
                  "Sort by (Default)",
                  "Price Ascending",
                  "Price Descending",
                ]}
              />
            </div>
          </div>
          <div className="flat-animate-tab">
            <div className="tab-content">
              <div
                className="tab-pane active show"
                id="gridLayout"
                role="tabpanel"
              >
                <div className="row">
                  {currentItems.map((elm, i) => (
                    <div key={i} className="col-xl-4 col-lg-6 col-md-6">
                      <div className="homelengo-box">
                        <div className="archive-top">
                          <Link
                            href={`/property-details-v1/${elm.id}`}
                            className="images-group"
                          >
                            <div className="images-style">
                              <Image
                                className="lazyload"
                                alt="img"
                                src={elm.imgSrc}
                                width={615}
                                height={405}
                              />
                            </div>
                            {/* ... more content ... */}
                          </Link>
                        </div>
                        <div className="archive-bottom">
                          <div className="content-top">
                            <h6 className="text-capitalize">
                              <Link
                                href={`/property-details-v1/${elm.id}`}
                                className="link"
                              >
                                {elm.title}
                              </Link>
                            </h6>
                            <ul className="meta-list">
                              <li className="item">
                                <i className="icon icon-bed" />
                                <span className="text-variant-1">Beds:</span>
                                <span className="fw-6">{elm.beds}</span>
                              </li>
                              {/* ... more meta list items ... */}
                            </ul>
                          </div>
                          {/* ... more archive bottom content ... */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <ul className="justify-content-center wd-navigation mt-20">
                  <Pagination
                    currentPage={currentPage}
                    setPage={(value) =>
                      dispatch({ type: "SET_CURRENT_PAGE", payload: value })
                    }
                    itemLength={sorted.length}
                    itemPerPage={itemPerPage}
                  />
                </ul>
              </div>
              <div className="tab-pane" id="listLayout" role="tabpanel">
                <div className="row">
                  {currentItems.map((elm, i) => (
                    <div key={i} className="col-md-6">
                      <div className="homelengo-box list-style-1 line">
                        <div className="archive-top">
                          <Link
                            href={`/property-details-v1/${elm.id}`}
                            className="images-group"
                          >
                            <div className="images-style">
                              <Image
                                className="lazyload"
                                alt="img-property"
                                src={elm.imgSrc}
                                width={344}
                                height={315}
                              />
                            </div>
                            {/* ... more content ... */}
                          </Link>
                        </div>
                        <div className="archive-bottom">
                          <div className="content-top">
                            <h6 className="text-capitalize">
                              <Link
                                href={`/property-details-v1/${elm.id}`}
                                className="link text-line-clamp-1"
                              >
                                {elm.title}
                              </Link>
                            </h6>
                            <ul className="meta-list">
                              <li className="item">
                                <i className="icon icon-bed" />
                                <span className="text-variant-1">Beds:</span>
                                <span className="fw-6">{elm.beds}</span>
                              </li>
                              {/* ... more meta list items ... */}
                            </ul>
                            {/* ... location content ... */}
                          </div>
                          {/* ... more archive bottom content ... */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <ul className="justify-content-center wd-navigation mt-20">
                  <Pagination
                    currentPage={currentPage}
                    setPage={(value) =>
                      dispatch({ type: "SET_CURRENT_PAGE", payload: value })
                    }
                    itemLength={state.filtered.length}
                    itemPerPage={itemPerPage}
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
