"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Gallery, Item } from "react-photoswipe-gallery";
const propertyImages = [
  {
    src: "/images/home/house-19.jpg",
    alt: "img-property",
    width: 627,
    height: 694,
  },
  // {
  //   src: "/images/airoli/airoli-virtual-office.webp",
  //   alt: "img-property",
  //   width: 627,
  //   height: 694,
  // },
  // {
  //   src: "/images/kharadi/kharadi-virtual-office.webp",
  //   alt: "img-property",
  //   width: 628,
  //   height: 694,
  // },
];

export default function Slider1() {
  // Convert prop to array in case you want multiple images later

  return (
    <Gallery>
      <section className="container flat-slider-detail-v1 px-10">
        {propertyImages.map((image, index) => (
          <div key={index}>
            <Item
              original={image.src}
              thumbnail={image.src}
              width={627}
              height={694}
            >
              {({ ref, open }) => (
                <div
                  onClick={open}
                  data-fancybox="gallery"
                  className="box-img-detail d-block"
                >
                  <Image
                    ref={ref}
                    alt={image.src}
                    src={image.src}
                    width={627}
                    height={100}
                  />
                </div>
              )}
            </Item>
          </div>
        ))}
      </section>
    </Gallery>
  );
}
