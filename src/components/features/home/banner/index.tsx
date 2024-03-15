import { Button } from "@/shared/button";
import Image from "next/image";
import React from "react";
import banner from "../../../../../public/image/banner/slider-bg-4.webp";
import leafFirst from "../../../../../public/image/banner-remove-bg/slider-shape-1.webp";
import leafSecond from "../../../../../public/image/banner-remove-bg/slider-shape-2.webp";
import leafThird from "../../../../../public/image/banner-remove-bg/slider-shape-3.webp";
const Banner = () => {
  return (
    <>
      <div className="banner mt-20 bg-bannerHead pl-4 px-10 pt-24 h-screen relative group mb-7 bg-center">
        <div className="flex items-center justify-between">
          <div className="content ml-7">
            <h4 className="text-green-ct5 font-semibold text-lg">TOP SELLER IN THE WEEK</h4>
            <h2 className="text-blue-ct7 font-bold text-6xl mt-4 mb-4">
              The Best <br /> Health Fresh.
            </h2>
            <p className="text-blue-ct7 font-medium mb-8">
              Presentation matters. Our fresh Vietnamese vegetable rolls <br /> look good and taste even better
            </p>
            <Button types="success" className="px-12 py-4 rounded-full hover:opacity-100 font-medium duration-500 hover:bg-blue-ct7">
              SHOP NOW
            </Button>
          </div>
          <Image src={banner} alt="" />
        </div>
        <Image src={leafFirst} alt="leaf" className="absolute bottom-24 left-96 group-hover:translate-x-4 duration-500" />
        <Image src={leafSecond} alt="leaf" className="absolute bottom-2 right-60 group-hover:translate-x-4 duration-500" />
        <Image src={leafThird} alt="leaf" className="absolute top-2 right-[600px] group-hover:translate-x-4 duration-500" />
      </div>
    </>
  );
};

export default Banner;
