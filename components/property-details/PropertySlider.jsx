"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Gallery, Item } from "react-photoswipe-gallery";
const propertyImages = [
  {
    src: "/images/banner/banner-property-1.jpg",
    alt: "img-property",
    width: 627,
    height: 694,
  },
  {
    src: "/images/banner/banner-property-3.jpg",
    alt: "img-property",
    width: 627,
    height: 694,
  },
  {
    src: "/images/banner/banner-property-2.jpg",
    alt: "img-property",
    width: 628,
    height: 694,
  },
  {
    src: "/images/banner/banner-property-1.jpg",
    alt: "img-property",
    width: 627,
    height: 694,
  },
];

export default function PropertySlider({ propertyImg }) {
  // Convert prop to array in case you want multiple images later
  const images = Array.isArray(propertyImg) ? propertyImg : [propertyImg];

  console.log("Get Image in Propeerty detail page", images);

  return (
    <Gallery>
      <section className="flat-slider-detail-v1 px-10">
        <Swiper
          className="swiper tf-sw-location"
          slidesPerView={3}
          spaceBetween={10}
          breakpoints={{
            1200: {
              slidesPerView: 3, // for tablet
              spaceBetween: 10, // for space-lg
            },
            640: {
              slidesPerView: 2, // for mobile-sm
              spaceBetween: 10, // for space-md
            },
            0: {
              slidesPerView: 1, // for mobile
              spaceBetween: 10, // for space
            },
          }}
          modules={[Pagination]}
          pagination={{ clickable: true, el: ".spb18" }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Item original={image} thumbnail={image} width={627} height={200}>
                {({ ref, open }) => (
                  <a
                    onClick={open}
                    data-fancybox="gallery"
                    className="box-img-detail d-block"
                  >
                    <Image
                      ref={ref}
                      alt={image}
                      src={image}
                      width={627}
                      height={200}
                    />
                  </a>
                )}
              </Item>
            </SwiperSlide>
          ))}
          <div className="sw-pagination spb18 sw-pagination-location text-center" />
        </Swiper>
      </section>
    </Gallery>
  );
}
