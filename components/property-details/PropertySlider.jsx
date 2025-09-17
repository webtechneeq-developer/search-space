"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css"; // Import gallery CSS

export default function PropertySlider({ propertyImg }) {
  const images = propertyImg || [];

  return (
    <Gallery>
      <section className="flat-slider-detail-v1 px-10">
        <Swiper
          className="swiper tf-sw-location"
          slidesPerView={3}
          spaceBetween={10}
          breakpoints={{
            1200: { slidesPerView: 3, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 10 },
            0: { slidesPerView: 1, spaceBetween: 10 },
          }}
          modules={[Pagination]}
          pagination={{ clickable: true, el: ".spb18" }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Item
                original={image}
                thumbnail={image}
                width={1024}
                height={768}
              >
                {({ ref, open }) => (
                  <a onClick={open} className="box-img-detail d-block">
                    <Image
                      ref={ref}
                      alt={`Gallery image ${index + 1}`}
                      src={image}
                      width={627}
                      height={450}
                      style={{
                        objectFit: "cover",
                        cursor: "pointer",
                        borderRadius: "8px",
                      }}
                    />
                  </a>
                )}
              </Item>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="sw-pagination spb18 sw-pagination-location text-center" />
      </section>
    </Gallery>
  );
}
