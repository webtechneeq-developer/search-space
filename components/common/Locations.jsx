"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

// Define image paths for cities and sub-locations
const locationImages = {
  mumbai: "/images/cities/new-mumbai-location.webp",
  "navi-mumbai": "/images/cities/navi-mumbai-img2.webp",
  pune: "/images/cities/pune-img1.webp",
  andheri: "/images/cities/andheri-img.webp",
  kurla: "/images/cities/kurla-img.webp",
  malad: "/images/cities/malad-img.webp",
  // Add other sub-location images here if needed
  default: "/images/cities/navi-mumbai-img2.webp",
};

function capitalizeWords(str) {
  return str
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function Locations({
  parentClass = "flat-location px-10 container",
  properties,
}) {
  // Determine if the properties object is a top-level city object or a single city's array
  const isCityData = Array.isArray(properties);
  let locationsToRender = [];

  if (isCityData) {
    // If it's an array, group listings by sub-location
    const subLocationsMap = properties.reduce((acc, property) => {
      const slug = property.subLocation.toLowerCase().replace(/ /g, "-");
      if (!acc[slug]) {
        acc[slug] = { listings: [], title: property.subLocation };
      }
      acc[slug].listings.push(property);
      return acc;
    }, {});
    locationsToRender = Object.entries(subLocationsMap);
  } else {
    // If it's an object, render cities
    locationsToRender = Object.entries(properties);
  }

  return (
    <section className={parentClass}>
      <div className="box-title text-center wow fadeInUp">
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
            500: { slidesPerView: 2, spaceBetween: 8 },
            320: { slidesPerView: 1, spaceBetween: 8 },
          }}
          modules={[Pagination]}
          pagination={{ clickable: true, el: ".spd4" }}
        >
          {locationsToRender.map(([slug, data], index) => {
            const locationTitle = isCityData ? data.title : slug;
            const linkSlug = isCityData
              ? `topmap-grid?location=${slug}&type=coworking-office`
              : `coworking-office/${slug}`;
            const itemCount = isCityData ? data.listings.length : data.length;
            const coverImage = locationImages[slug] || locationImages.default;

            return (
              <SwiperSlide className="swiper-slide" key={index}>
                <Link href={`/${linkSlug}`} className="box-location">
                  <div className="image img-style">
                    <Image
                      className="lazyload"
                      alt={locationTitle}
                      src={coverImage}
                      width={465}
                      height={578}
                    />
                  </div>
                  <div className="content">
                    <div className="inner-left">
                      <span className="sub-title fw-6">
                        {itemCount} Properties
                      </span>
                      <h6 className="title text-line-clamp-1 link">
                        {capitalizeWords(locationTitle)}
                      </h6>
                    </div>
                    <button className="box-icon line w-44 round">
                      <i className="icon icon-arrow-right2" />
                    </button>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
          <div className="sw-pagination spd4 spd1 sw-pagination-location text-center" />
        </Swiper>
      </div>
    </section>
  );
}
