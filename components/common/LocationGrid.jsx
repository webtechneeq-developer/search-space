import React from "react";
import Link from "next/link";
import Image from "next/image";

// Helper function to format text for display (e.g., "navi-mumbai" -> "Navi Mumbai")
function capitalizeWords(str) {
  if (!str) return "";
  return str
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function LocationGrid({
  title,
  locations,
  noLocationMessage = "No locations found.",
}) {
  return (
    <section className="flat-location container py-5">
      <div className="box-title text-center wow fadeInUp">
        <h3 className="mt-4 title new-title">{title}</h3>
      </div>

      {locations.length > 0 ? (
        <div className="row mt-4 wow fadeInUp" data-wow-delay=".2s">
          {locations.map((loc, index) => {
            const count = loc.propertyCount;
            // The image source is now passed directly as a prop
            const imageSrc = loc.image || "/images/cities/default-city.webp"; // Use a fallback image

            return (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <Link href={loc.url} className="box-location">
                  <div className="image img-style">
                    <Image
                      className="lazyload"
                      src={imageSrc}
                      alt={loc.name}
                      width={465}
                      height={578}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="content card-box">
                    <div className="inner-left">
                      <h6 className="title text-capitalize link mb-0">
                        {capitalizeWords(loc.name)}
                      </h6>
                      <small className="text-muted">
                        {count} {count === 1 ? "property" : "properties"}
                      </small>
                    </div>
                    <div className="explore-btn">
                      <span>Explore</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center mt-4">
          <p className="lead text-muted">{noLocationMessage}</p>
        </div>
      )}
    </section>
  );
}
