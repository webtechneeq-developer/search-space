"use client";
import { testimonialData } from "@/data/testimonials";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import { seoPages } from "@/data/seoPages";
export default function SeoLinks() {
  return (
    <section className="flat-section bg-primary-new flat-testimonial flex-item">
      <div>
        {" "}
        {/*className="box-title px-15 wow fadeInUp" */}
        <div
          className="text-center wow fadeInUpSmall"
          data-wow-delay=".2s"
          data-wow-duration="2000ms"
        >
          <div className="d-flex gap-8">
            {seoPages.map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="desc text-variant-1"
              >
                || {page.title} ||
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
