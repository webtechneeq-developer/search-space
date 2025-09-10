import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const dummyImage = "https://via.placeholder.com/300x200"; // Replace with your dummy image URL
const Image1 = "/images/grid_services/image1.webp";
const Image2 = "/images/grid_services/image2.webp";

const Image3 = "/images/grid_services/image3.webp";

const Image4 = "/images/grid_services/image4.webp";

export default function Grid_Services() {
  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "14px",
          color: "#2d2d2d",

          fontSize: "32px",
          fontWeight: "700",
          textTransform: "capitalize",
        }}
      >
        Conventional Workspace
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "auto auto auto",

          background: "#fafbfc",
          fontFamily: "sans-serif",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Top Left */}
        <div className="grid-content">
          <p>
            Conventional office spaces refer to traditional, standalone office
            spaces that are leased or rented by businesses. These spaces
            typically come in the form of commercial real estates properties
            such as office buildings, business parks, or standalone structures.
          </p>
        </div>
        {/* Top Mid (image) */}
        <img
          src={Image1}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="Office Exterior"
        />
        {/* Top Right */}
        <div className="grid-content">
          <p>
            Conventional office spaces are usually leased for long-term periods,
            typically 1-10 years, and require significant upfront costs for
            things like furniture, fixtures, equipment, utilities, and
            maintenance.
          </p>
        </div>
        {/* Middle Left (image) */}
        <img
          src={Image2}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="Office Interior"
        />
        {/* Middle Center */}
        <div className="grid-content">
          <p>
            Businesses must also take responsibility for managing and
            maintaining the space, including cleaning, repairs, and security.
          </p>
        </div>
        {/* Middle Right (image) */}
        <img
          src={Image3}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="Workspace"
        />
        {/* Bottom Left */}
        <div className="grid-content">
          <p>
            One of the advantages of conventional office spaces is that they
            provide businesses with complete control over their workspace and
            the ability to customize it to their specific needs.
          </p>
        </div>
        {/* Bottom Mid (image) */}
        <img
          src={Image4}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="Custom Office"
        />
        {/* Bottom Right */}
        <div className="grid-content">
          <p>
            Our team at Search Spaces assist you in scanning and identifying the
            right commercial property which suits your requirement at pan India
            level.
          </p>
        </div>
      </div>
    </div>
  );
}
