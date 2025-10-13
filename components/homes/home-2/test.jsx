"use client";
import React from "react";
import Image from "next/image";

export default function Benefit() {
  return (
    <section className="flat-section bg-primary-new py-16">
      <div className="container3 mx-auto px-4">
        <div className="flat-img-with-text-v2 flex flex-col lg:flex-row items-center gap-12">
          {/* Left Image */}
          <div className="content-left flex-1">
            <div className="grid-img-group relative">
              <div className="tf-image-wrap item-1 mb-4 lg:mb-0">
                <Image
                  src="/images/service-1.jpg"
                  alt="Service 1"
                  width={400}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="tf-image-wrap item-2 absolute top-8 left-8">
                <Image
                  src="/images/service-2.jpg"
                  alt="Service 2"
                  width={200}
                  height={150}
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="content-right flex-1">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
              Why Choose Our Services
            </h2>
            <p className="text-white mb-8">
              Discover the advantages of registering coworking and office spaces
              with us. We provide verified spaces, zero brokerage, and flexible
              plans that meet your needs.
            </p>

            {/* Services Flex */}
            <div className="flex flex-wrap gap-6">
              {/* Service Item */}
              <a
                href="#"
                className="flex-1 min-w-[250px] bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="icon-box mb-4">
                  {/* Add your SVG icon here */}
                  <span className="icon text-4xl">🏢</span>
                </div>
                <div className="content">
                  <h5 className="text-xl font-semibold mb-2">
                    Pan India Presence
                  </h5>
                  <p className="text-gray-700 text-sm">
                    We facilitate you to register a coworking space and office
                    spaces amongst numerous choices in major cities across the
                    nation.
                  </p>
                </div>
              </a>

              <a
                href="#"
                className="flex-1 min-w-[250px] bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="icon-box mb-4">
                  <span className="icon text-4xl">🎯</span>
                </div>
                <div className="content">
                  <h5 className="text-xl font-semibold mb-2">Bespoke</h5>
                  <p className="text-gray-700 text-sm">
                    You can get the most affordable coworking spaces near you
                    that suits your team’s needs by just a click or chat with
                    our consultant.
                  </p>
                </div>
              </a>

              <a
                href="#"
                className="flex-1 min-w-[250px] bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="icon-box mb-4">
                  <span className="icon text-4xl">✅</span>
                </div>
                <div className="content">
                  <h5 className="text-xl font-semibold mb-2">Verified Spaces</h5>
                  <p className="text-gray-700 text-sm">
                    Fully managed coworking spaces ensure productive work in a
                    collaborative environment.
                  </p>
                </div>
              </a>

              <a
                href="#"
                className="flex-1 min-w-[250px] bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="icon-box mb-4">
                  <span className="icon text-4xl">💰</span>
                </div>
                <div className="content">
                  <h5 className="text-xl font-semibold mb-2">Zero Brokerage</h5>
                  <p className="text-gray-700 text-sm">
                    Our platform charges zero brokerage for booking coworking and
                    office spaces across India.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
