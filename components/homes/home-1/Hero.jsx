// import FilterTab from "@/components/common/FilterTab";
// import WordEffect1 from "@/components/common/WordEffect1";

// export default function Hero() {
//   return (
//     <section className="flat-slider home-1">
//       <div className="container relative">
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="slider-content">
//               <div className="heading text-center">
//                 <div className="title-large text-white animationtext slide">
//                   Find Your Ideal{" "}
//                   <WordEffect1 string={["Coworking Space", "Coworking Office"]} />
//                 </div>
//                 <p
//                   className="subtitle text-white body-2 wow fadeInUp"
//                   data-wow-delay=".2s"
//                 >
//                   Affordable Co-working spaces in the Location of your choice
//                 </p>
//               </div>
//               <FilterTab />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="overlay" />
//     </section>
//   );
// }




"use client";
import FilterTab from "@/components/common/FilterTab";
import TyperComponent from "@/components/common/Typer";
// import WordEffect1 from "@/components/common/WordEffect1";
import { sliderImages } from "@/data/heroSlides";
import React from "react";
import Image from "next/image";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  return (
    <section className="flat-slider home-2 bg-primary-new">
      <div className="container relative">
        <div className="row">
          <div className="col-xl-10">
            <div className="slider-content">
              <div className="heading">
                <h1 className="fw-8 title animationtext clip">
                  Find Your Ideal Coworking 
                  <br />
                  <TyperComponent
                    strings={["privete office", " Dedicated Desk"," Flexi Desk"," Meeting Room"," Conference Room"," Day Pass","Virtual Office"]}
                  />
                </h1>
                <p
                  className="subtitle body-2 wow fadeInUp"
                  data-wow-delay=".2s"
                >
                  Find best Co-Working Space at affordable price across  {" "}
                  <br />
                   Mumbai, Navi Mumbai & Pune.
                </p>
              </div>

              <FilterTab />
            </div>
          </div>
        </div>
      </div>
      <div className="img-banner-left">
        <Image
          alt="img"
          src="/images/slider/graplic-slider-2.png"
          width={412}
          height={187}
        />
      </div>
      <div className="img-banner-right">
        <Swiper
          effect="fade"
          modules={[EffectFade, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={500}
          className="swiper slider-sw-home2"
        >
          {sliderImages.map((image, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className={`slider-home2 ${image.className || ""}`}>
                <Image
                  alt={image.alt}
                  src={image.src}
                  width={image.width}
                  height={image.height}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
