import React from "react";

export default function Disclaimer() {
  // Get today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="container-fluid p-0">


      {/* Content Section */}
      <div className="container my-5">
        <div className="card1 shadow-sm border-0">
          <div className="card-body1 p-4 p-md-5">
            <p className="text-muted fst-italic mb-4">
              <strong>Last Updated: {formattedDate}</strong>
            </p>

            <p className="mb-3">
              While every precaution has been taken in the preparation of this
              website and its contents, it is intended to be general in nature
              information. Search Spaces (“us”, “we”, or “our”) assumes no
              responsibility for errors or omissions, representations,
              warranties of any kind, express or implied, about the
              completeness, accuracy, reliability, suitability with respect to
              the website or the information contained on the website for any
              purpose.
            </p>

            <p className="mb-3">
              This website may contain links to third-party websites. Search
              Spaces is not responsible for the contents of any linked site or
              any link contained in a linked site. This website is providing
              these links only as a convenience, and the inclusion of a link
              does not imply endorsement of the linked site by Search Spaces.
            </p>

            <p className="mb-3">
              Any belief you place on such information is therefore strictly at
              your own risk. In no circumstances will Search Spaces be liable
              for any loss or damage including without limitation, indirect or
              consequential loss or damage, or any loss or damage whatsoever
              arising out of or in connection with, the use of this website.
            </p>

            <p className="mb-0">
              All information and features described herein are subject to
              change without notice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
