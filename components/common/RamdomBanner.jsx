"use client";
import { useMemo } from "react";
import Image from "next/image";

const bannerImages = [
  "/images/banner/coworking-image-1.webp",
  "/images/banner/coworking-image-1.webp",
  "/images/banner/coworking-image-1.webp",
  "/images/banner/coworking-image-1.webp",
];

export default function RandomBanner() {
  const selectedBanner = useMemo(() => {
    const index = Math.floor(Math.random() * bannerImages.length);
    return bannerImages[index];
  }, []);

  return (
    <div className="random-banner w-full">
      <Image
        src={selectedBanner}
        alt="Promotional Banner"
        width={1920}
        height={400}
        className="object-cover w-full h-[300px] rounded-xl"
        priority
      />
    </div>
  );
}
