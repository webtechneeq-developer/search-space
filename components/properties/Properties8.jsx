"use client";
import React, { useEffect, useReducer, useRef, useState } from "react";
import PropertyMap from "../common/PropertyMap";
import { useSearchParams } from "next/navigation";
import { properties } from "@/data/demoProporties";
import DropdownSelect from "../common/DropdownSelect";
import Link from "next/link";
import Image from "next/image";
import Pagination from "../common/Pagination";
import AdvanceSearch2 from "../common/AdvanceSearch2";
import DropdownSelect2 from "../common/DropdownSelect2";
import { initialState, reducer } from "@/context/propertyFilterReducer";
import RandomBanner from "../common/RamdomBanner";
import { allProperties } from "@/data/propertiesData";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "next/navigation";

export default function SubLocation({
  parentClass = "flat-location px-10 container",
}) {
  const { location } = useParams(); // "mumbai", "pune", etc.
  const cityProperties = allProperties[location] || [];

  // Group properties by subLocation
  const subLocationMap = cityProperties.reduce((acc, property) => {
    const sub = property.subLocation?.toLowerCase() || "other";
    if (!acc[sub]) acc[sub] = [];
    acc[sub].push(property);
    return acc;
  }, {});

  return (
    <>
      {/* Map */}
      <section className="flat-map">
        <div id="map">
          {" "}
          {/* className="top-map" */}
          <RandomBanner />
        </div>
      </section>
      {/* Map */}
      <section className="flat-section flat-recommended">
        <div className="container">
          <div className="box-title-listing">
            <div className="box-left">
              <h3 className="fw-8">Property Listing</h3>
              <p className="text">
                There are currently {subLocationMap.length} properties.
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
                    <svg
                      className="icon"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.54883 5.90508C4.54883 5.1222 5.17272 4.5 5.91981 4.5C6.66686 4.5 7.2908 5.12221 7.2908 5.90508C7.2908 6.68801 6.66722 7.3101 5.91981 7.3101C5.17241 7.3101 4.54883 6.68801 4.54883 5.90508Z"
                        stroke="#A3ABB0"
                      />
                      <path
                        d="M10.6045 5.90508C10.6045 5.12221 11.2284 4.5 11.9755 4.5C12.7229 4.5 13.3466 5.1222 13.3466 5.90508C13.3466 6.68789 12.7227 7.3101 11.9755 7.3101C11.2284 7.3101 10.6045 6.68794 10.6045 5.90508Z"
                        stroke="#A3ABB0"
                      />
                      <path
                        d="M19.4998 5.90514C19.4998 6.68797 18.8757 7.31016 18.1288 7.31016C17.3818 7.31016 16.7578 6.68794 16.7578 5.90508C16.7578 5.12211 17.3813 4.5 18.1288 4.5C18.8763 4.5 19.4998 5.12215 19.4998 5.90514Z"
                        stroke="#A3ABB0"
                      />
                      <path
                        d="M7.24249 12.0098C7.24249 12.7927 6.61849 13.4148 5.87133 13.4148C5.12411 13.4148 4.5 12.7926 4.5 12.0098C4.5 11.2268 5.12419 10.6045 5.87133 10.6045C6.61842 10.6045 7.24249 11.2267 7.24249 12.0098Z"
                        stroke="#A3ABB0"
                      />
                      <path
                        d="M13.2976 12.0098C13.2976 12.7927 12.6736 13.4148 11.9266 13.4148C11.1795 13.4148 10.5557 12.7928 10.5557 12.0098C10.5557 11.2266 11.1793 10.6045 11.9266 10.6045C12.6741 10.6045 13.2976 11.2265 13.2976 12.0098Z"
                        stroke="#A3ABB0"
                      />
                      <path
                        d="M19.4516 12.0098C19.4516 12.7928 18.828 13.4148 18.0807 13.4148C17.3329 13.4148 16.709 12.7926 16.709 12.0098C16.709 11.2268 17.3332 10.6045 18.0807 10.6045C18.8279 10.6045 19.4516 11.2266 19.4516 12.0098Z"
                        stroke="#A3ABB0"
                      />
                      <path
                        d="M4.54297 18.0945C4.54297 17.3116 5.16709 16.6895 5.9143 16.6895C6.66137 16.6895 7.28523 17.3114 7.28523 18.0945C7.28523 18.8776 6.66139 19.4996 5.9143 19.4996C5.16714 19.4996 4.54297 18.8771 4.54297 18.0945Z"
                        stroke="#A3ABB0"
                      />
                      <path
                        d="M10.5986 18.0945C10.5986 17.3116 11.2227 16.6895 11.97 16.6895C12.7169 16.6895 13.3409 17.3115 13.3409 18.0945C13.3409 18.8776 12.7169 19.4996 11.97 19.4996C11.2225 19.4996 10.5986 18.8772 10.5986 18.0945Z"
                        stroke="#A3ABB0"
                      />
                      <path
                        d="M16.752 18.0945C16.752 17.3115 17.376 16.6895 18.1229 16.6895C18.8699 16.6895 19.4939 17.3115 19.4939 18.0945C19.4939 18.8776 18.8702 19.4996 18.1229 19.4996C17.376 19.4996 16.752 18.8772 16.752 18.0945Z"
                        stroke="#A3ABB0"
                      />
                    </svg>
                  </a>
                </li>
                <li className="nav-tab-item" role="presentation">
                  <a
                    href="#listLayout"
                    className="nav-link-item"
                    data-bs-toggle="tab"
                  >
                    <svg
                      className="icon"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.2016 17.8316H8.50246C8.0615 17.8316 7.7041 17.4742 7.7041 17.0332C7.7041 16.5923 8.0615 16.2349 8.50246 16.2349H19.2013C19.6423 16.2349 19.9997 16.5923 19.9997 17.0332C19.9997 17.4742 19.6426 17.8316 19.2016 17.8316Z"
                        fill="#A3ABB0"
                      />
                      <path
                        d="M19.2016 12.8199H8.50246C8.0615 12.8199 7.7041 12.4625 7.7041 12.0215C7.7041 11.5805 8.0615 11.2231 8.50246 11.2231H19.2013C19.6423 11.2231 19.9997 11.5805 19.9997 12.0215C20 12.4625 19.6426 12.8199 19.2016 12.8199Z"
                        fill="#A3ABB0"
                      />
                      <path
                        d="M19.2016 7.80913H8.50246C8.0615 7.80913 7.7041 7.45173 7.7041 7.01077C7.7041 6.5698 8.0615 6.2124 8.50246 6.2124H19.2013C19.6423 6.2124 19.9997 6.5698 19.9997 7.01077C19.9997 7.45173 19.6426 7.80913 19.2016 7.80913Z"
                        fill="#A3ABB0"
                      />
                      <path
                        d="M5.0722 8.1444C5.66436 8.1444 6.1444 7.66436 6.1444 7.0722C6.1444 6.48004 5.66436 6 5.0722 6C4.48004 6 4 6.48004 4 7.0722C4 7.66436 4.48004 8.1444 5.0722 8.1444Z"
                        fill="#A3ABB0"
                      />
                      <path
                        d="M5.0722 13.0941C5.66436 13.0941 6.1444 12.6141 6.1444 12.0219C6.1444 11.4297 5.66436 10.9497 5.0722 10.9497C4.48004 10.9497 4 11.4297 4 12.0219C4 12.6141 4.48004 13.0941 5.0722 13.0941Z"
                        fill="#A3ABB0"
                      />
                      <path
                        d="M5.0722 18.0433C5.66436 18.0433 6.1444 17.5633 6.1444 16.9711C6.1444 16.379 5.66436 15.8989 5.0722 15.8989C4.48004 15.8989 4 16.379 4 16.9711C4 17.5633 4.48004 18.0433 5.0722 18.0433Z"
                        fill="#A3ABB0"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <section className={parentClass}>
            <div className="box-title text-center wow fadeInUp">
              <div className="text-subtitle text-primary">
                Choose from thousands of locations to position your business
              </div>
              <h3 className="mt-4 title">Find A Workspace In Your City</h3>
            </div>
            <div className="wow fadeInUp" data-wow-delay=".2s">
              <Swiper
                className="swiper tf-sw-location"
                spaceBetween={8}
                slidesPerView={3}
                breakpoints={{
                  1600: { slidesPerView: 3, spaceBetween: 8 },
                  1224: { slidesPerView: 3, spaceBetween: 8 },
                  1100: { slidesPerView: 3, spaceBetween: 8 },
                  768: { slidesPerView: 3, spaceBetween: 8 },
                  500: { slidesPerView: 3, spaceBetween: 8 },

                  320: { slidesPerView: 1, spaceBetween: 8 },
                }}
                modules={[Pagination]}
                pagination={{ clickable: true, el: ".spd4" }}
              >
                {Object.entries(subLocationMap).map(
                  ([slug, listings], index) => {
                    const locationTitle = slug
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase());

                    const coverImage =
                      subLocationMap[0]?.imgSrc ||
                      "/images/location/navi-mumbai-location.webp";

                    return (
                      <SwiperSlide className="swiper-slide" key={index}>
                        <Link
                          href={`/${location}/${slug}`}
                          className="box-location"
                        >
                          <div className="image img-style">
                            <Image
                              className="lazyload"
                              data-src={coverImage}
                              alt={locationTitle}
                              src={coverImage}
                              width={465}
                              height={578}
                            />
                          </div>
                          <div className="content">
                            <div className="inner-left">
                              <span className="sub-title fw-6">
                                {listings.length} properties
                              </span>
                              <h6 className="title text-line-clamp-1 link">
                                {locationTitle}
                              </h6>
                            </div>
                            <button className="box-icon line w-44 round">
                              <i className="icon icon-arrow-right2" />
                            </button>
                          </div>
                        </Link>
                      </SwiperSlide>
                    );
                  }
                )}
                <div className="sw-pagination spd4 spd1 sw-pagination-location text-center" />
              </Swiper>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
