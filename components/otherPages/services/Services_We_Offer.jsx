import React from "react";
import Link from "next/link";
import Image from "next/image";
import { servicesWeOffer } from "@/data/servicesWeOffer";

export const Services_We_Offer = () => {
  return (
    <section className="flat-section">
      <div className="container hover:border-2 hover:border-blue-500 transition ">
        <div
          className="box-title text-center wow fadeInUpSmall "
          data-wow-delay=".2s"
          data-wow-duration="2000ms"
        >
          {/* <div className="text-subtitle text-primary">Services We Offer</div> */}
          <h3 className="title text-lg">
            Coworking Space / Managed Office Space - At Zero Brokerage
          </h3>
        </div>
        <div
          className="tf-grid-layout md-col-3 wow fadeInUpSmall"
          data-wow-delay=".4s"
          data-wow-duration="2000ms"
        >
          {servicesWeOffer.map((elm, i) => (
            <div
              key={i}
              className="box-service hover:border-2 hover:border-blue-500 transition duration-300"
            >
              <div className="image">
                <Image
                  className="lazyload"
                  alt={`service-${i}`}
                  src={elm.imageSrc}
                  width={90}
                  height={90}
                />
              </div>
              <div className="content">
                <h5 className="title">{elm.title}</h5>
                <p className="description">{elm.description}</p>
                <Link href={`/service-details`} className="tf-btn btn-line">
                  Learn More <span className="icon icon-arrow-right2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
