"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

// Helper function to capitalize text
function capitalizeWords(str) {
  if (!str) return "";
  return str
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function Locations({ locations = [] }) {
  return (
    <section className="flat-location px-10 container">
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
            1100: { slidesPerView: 3, spaceBetween: 8 },
            768: { slidesPerView: 2, spaceBetween: 8 },
            320: { slidesPerView: 1, spaceBetween: 8 },
          }}
          modules={[Pagination]}
          pagination={{ clickable: true, el: ".spd4" }}
        >
          {locations.map((location, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <Link href={location.url} className="box-location">
                <div className="image img-style">
                  <Image
                    className="lazyload"
                    alt={location.name}
                    src={location.image}
                    width={465}
                    height={578}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="content card-box">
                  <div className="inner-left">
                    <h6 className="title text-line-clamp-1 link">
                      {capitalizeWords(location.name)}
                    </h6>
                    <span className="text-muted">
                      {location.propertyCount} Properties
                    </span>
                  </div>
                  <div className="explore-btn">
                    <span>Explore</span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="sw-pagination spd4 sw-pagination-location text-center" />
      </div>
    </section>
  );
}
