"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { spaceData } from "@/data/spaces";

export default function Locations({
  parentClass = "flat-location px-10 container",
}) {
  // Extract all unique cities and their associated properties from spaceData
  const cities = {};

  spaceData.forEach((spaceType) => {
    Object.entries(spaceType.cities).forEach(([citySlug, localities]) => {
      // Create a slug from the city name to use in the URL
      const slug = citySlug.replace(/ /g, "-").toLowerCase();

      // Initialize the city entry if it doesn't exist
      if (!cities[slug]) {
        cities[slug] = {
          count: 0,
          coverImage: "", // You can add logic to set a dynamic image here
        };
      }
      // Add the number of localities to the count
      cities[slug].count += localities.length;
    });
  });

  // Since we are creating a city-based slider, we need to map the data
  // to a simpler format for rendering. You should replace this with your
  // actual city images.
  const cityImages = {
    mumbai: "/images/location/mumbai.jpg",
    "navi-mumbai": "/images/location/navi-mumbai.jpg",
    pune: "/images/location/pune.jpg",
  };

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
          {Object.entries(cities).map(([slug, data], index) => {
            const locationTitle = slug
              .replace(/-/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase());

            const coverImage =
              cityImages[slug] || "/images/location/default.jpg";

            // Modify the URL to match the desired format, assuming you want a generic grid page
            const modifiedSlug = `/topmap-grid?location=${slug}`;

            return (
              <SwiperSlide className="swiper-slide" key={index}>
                <Link href={modifiedSlug} className="box-location">
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
                        {data.count} properties
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
          })}
          <div className="sw-pagination spd4 spd1 sw-pagination-location text-center" />
        </Swiper>
      </div>
    </section>
  );
}
