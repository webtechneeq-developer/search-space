"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { locations } from "@/data/locations";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
export default function Locations({ parentClass = "flat-location px-10", properties }) {


  return (
    <section className={parentClass}>
      <div className="box-title text-center wow fadeInUp">
        <div className="text-subtitle text-primary">Choose from thousands of locations to position your business</div>
        <h3 className="mt-4 title">Find A Workspace In Your City</h3>
      </div>
      <div className="wow fadeInUp" data-wow-delay=".2s">
        <Swiper
          className="swiper tf-sw-location"
          spaceBetween={8}
          slidesPerView={6}
          breakpoints={{
            1600: { slidesPerView: 6, spaceBetween: 8 },
            1224: { slidesPerView: 4, spaceBetween: 8 },
            1100: { slidesPerView: 3, spaceBetween: 8 },
            768: { slidesPerView: 3, spaceBetween: 8 },
            500: { slidesPerView: 2, spaceBetween: 8 },

            320: { slidesPerView: 1, spaceBetween: 8 },
          }}
          modules={[Pagination]}
          pagination={{ clickable: true, el: ".spd4" }}
        >
          {Object.entries(properties).map(([slug, listings], index) => {
            const locationTitle = slug
              .replace(/-/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase());

            const coverImage = locations[0]?.imgSrc || "/images/location/location-1.jpg";

            return (
              <SwiperSlide className="swiper-slide" key={index}>
                <Link href={`/${slug}`} className="box-location">
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
                      <span className="sub-title fw-6">{listings.length} properties</span>
                      <h6 className="title text-line-clamp-1 link">{locationTitle}</h6>
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
