"use client";
import { seoPages } from "@/data/seoPages";
import React from "react";
import Link from "next/link";

export default function SeoLinks() {
  return (
    <section className="flat-section flat-testimonial flex-item">
      <div>
        <div
          className="text-center wow fadeInUpSmall"
          data-wow-delay=".2s"
          data-wow-duration="2000ms"
        >
          <div
            className="d-flex gap-8 flex-wrap justify-center"
            style={{ maxWidth: "750px", margin: "0 auto" }}
          >
            {seoPages.map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="desc .text-variant-011"
              >
                 {page.title} |
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
