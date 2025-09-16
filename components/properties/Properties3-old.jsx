"use client";

import React, { useEffect, useReducer, useRef } from "react";
import DropdownSelect from "../common/DropdownSelect";
import Link from "next/link";
import Image from "next/image";
import Pagination from "../common/Pagination";
import AdvanceSearch2 from "../common/AdvanceSearch2";
import RandomBanner from "../common/RamdomBanner";
import { initialState, reducer } from "@/context/propertyFilterReducer";

export default function Properties3({ propertiesData = [] }) {
  const ddContainer = useRef();
  const advanceBtnRef = useRef();

  // Initialize state with the data from props
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    filtered: propertiesData,
    sorted: propertiesData,
  });

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

  // Effect to re-filter properties when any filter changes
  useEffect(() => {
    let filteredResults = [...propertiesData];

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

    // You mentioned there is no sqft in your data, so this part is commented out
    // if (size[0] !== 0 || size[1] !== 100000) {
    //   filteredResults = filteredResults.filter(
    //     (elm) => elm.sqft >= size[0] && elm.sqft <= size[1]
    //   );
    // }

    dispatch({ type: "SET_FILTERED", payload: filteredResults });
  }, [propertiesData, price, size, rooms, bedrooms, bathrooms, features]);

  // Effect to re-sort filtered properties when sorting option changes
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
                        {/* SVG for search advanced button */}
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
                    {/* SVG for grid layout */}
                  </a>
                </li>
                <li className="nav-tab-item" role="presentation">
                  <a
                    href="#listLayout"
                    className="nav-link-item"
                    data-bs-toggle="tab"
                  >
                    {/* SVG for list layout */}
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
              {/* Grid Layout */}
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
                            <div className="top">
                              <ul className="d-flex gap-6">
                                <li className="flag-tag primary">Featured</li>
                                <li className="flag-tag style-1">For Sale</li>
                              </ul>
                            </div>
                            <div className="bottom">
                              {/* SVG for location icon */}
                              {elm.address}
                            </div>
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
                                {/* ... bed icon ... */}
                                <span className="text-variant-1">Beds:</span>
                                <span className="fw-6">{elm.beds}</span>
                              </li>
                              {/* ... more meta list items ... */}
                            </ul>
                          </div>
                          <div className="content-bottom">
                            <div className="d-flex gap-8 align-items-center">
                              <div className="avatar avt-40 round">
                                <Image
                                  alt="avt"
                                  src={elm.avatar}
                                  width={34}
                                  height={34}
                                />
                              </div>
                              <span>{elm.agent}</span>
                            </div>
                            <h6 className="price">
                              ₹{formatIndianCurrency(elm.price)}
                            </h6>
                          </div>
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
              {/* List Layout */}
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
                            <div className="top">
                              <ul className="d-flex gap-6 flex-wrap">
                                <li className="flag-tag primary">Featured</li>
                                <li className="flag-tag style-1">For Sale</li>
                              </ul>
                            </div>
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
                                {/* ... bed icon ... */}
                                <span className="text-variant-1">Beds:</span>
                                <span className="fw-6">{elm.beds}</span>
                              </li>
                              {/* ... more meta list items ... */}
                            </ul>
                            <div className="location">
                              {/* SVG for location icon */}
                              <span className="text-line-clamp-1">
                                {elm.address}
                              </span>
                            </div>
                          </div>
                          <div className="content-bottom">
                            <div className="d-flex gap-8 align-items-center">
                              <div className="avatar avt-40 round">
                                <Image
                                  alt="avt"
                                  src={elm.avatar}
                                  width={34}
                                  height={34}
                                />
                              </div>
                              <span>{elm.agent}</span>
                            </div>
                            <h6 className="price">
                              ₹{formatIndianCurrency(elm.price)}
                            </h6>
                          </div>
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
