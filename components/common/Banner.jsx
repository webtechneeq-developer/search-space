import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Banner() {
  return (
    // <section className="flat-section pt-20 flat-banner">
    //   <div className="container">
    //     <div className="wrap-banner bg-primary-new flat-title-page1">
    //       <div className="box-left">
    //         <div className="box-title">
    //          <div className="text-subtitle text-primary">
    //             Wish to be part of our team?
    //           </div> 
    //           <h6 className="mt-4 fw-8">
    //             <span className="">Zero</span> Brokerage Fees
    //           </h6>
    //           <h6 className="mt-4 fw-8">
    //             <span className="">No</span> Hidden Cost
    //           </h6>
    //           <h6 className="mt-4 fw-8">
    //             <span className="">100%</span> Verified Listings
    //           </h6>
    //         </div>
    //         <Link
    //           href={`/contact`}
    //           className="tf-btn btn-view primary size-1 hover-btn-view">
    //           Join Us Today <span className="icon icon-arrow-right2" />
    //         </Link>
    //       </div>
    //      <div className="box-right">
    //         <Image
    //           alt="image"
    //           src="/images/banner/banner.png"
    //           width={748}
    //           height={380}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="flat-section pt-20 flat-banner">
      <div className="container">
        <div className="wrap-banner bg-primary-new flat-title-page1">
          <div className="row">
            <div className="col-lg-12">
                          <div className="box-left">
            <div className="box-title">
              {/* <div className="text-subtitle text-primary">
                Wish to be part of our team?
              </div> */}
              <h6 className="mt-4 fw-7">
                <span className="cta-title1">Zero</span> Brokerage Fees
              </h6>
              <h6 className="mt-4 fw-7">
                <span className="cta-title1">No</span> Hidden Cost
              </h6>
              <h6 className="mt-4 fw-7">
                <span className="cta-title1">100%</span> Verified Listings
              </h6>
            </div>
            <Link
              href={`/contact`}
              className="tf-btn btn-view primary size-1 hover-btn-view">
              Get In Touch <span className="icon icon-arrow-right2" />
            </Link>
          </div>
            </div>
          </div>
          <div className="box-right">
            <Image
              alt="image"
              src="/images/banner/new-cta-btn1.webp"
              width={748}
              height={380}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
