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

export default function Slider1({ propertyImg }) {
  // Convert prop to array in case you want multiple images later
  const images = Array.isArray(propertyImg) ? propertyImg : [propertyImg];

  console.log("Get Image in Propeerty detail page", images);

  return (
    <Gallery>
      <section className="container flat-slider-detail-v1 px-10">
        {images.map((image, index) => (
          <div key={index}>
            <Item original={image} thumbnail={image} width={627} height={694}>
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
          </div>
        ))}
      </section>
    </Gallery>
  );
}
