import React from "react";
import Link from "next/link";
export default function CoworkingOfficeTitle() {
  return (
    <section
      className="flat-title-page"
      style={{ backgroundImage: "url(/images/page-title/page-title-5.jpg)" }}
    >
      <div className="container">
        <div className="breadcrumb-content">
          <h1 className="text-center text-white title">Co-Working Office</h1>
          <ul className="breadcrumb">
            <li>
              <Link href={`/`} className="text-white">
                Home
              </Link>
            </li>
            <li className="text-white">/ Pages</li>
            <li className="text-white">/ About Us</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
