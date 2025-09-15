"use client";
import { propertyTypes } from "@/data/propertyTypes";
import Image from "next/image";
import Link from "next/link";

// Utility to convert name to slug (e.g., "Co-Working Space" → "co-working-space")
const toSlug = (text) => text.toLowerCase().replace(/\s+/g, "-");

export default function PropertyTypes() {
  return (
    <section className="flat-section flat-recommended">
      <div className="container">
        <div className="box-title text-center wow fadeInUp">
          <div className="text-subtitle text-primary">
            Find what suits your work
          </div>
          <h3 className="mt-4 title">Types of Office Spaces</h3>
        </div>
        <div className="row mt-5">
          {propertyTypes.map((type) => (
            <div key={type.id} className="col-xl-3 col-lg-4 col-md-6 mb-4">
              <Link href={`/${toSlug(type.slug)}`}>
                <div className="homelengo-box text-center hover-scale cursor-pointer">
                  <div className="images-style">
                    <Image
                      src={type.img}
                      alt={type.name}
                      width={300}
                      height={200}
                      className="img-fluid rounded"
                    />
                  </div>
                  <h6 className="mt-3 mb-3 text-capitalize hover-scale">
                    {type.name}
                  </h6>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
