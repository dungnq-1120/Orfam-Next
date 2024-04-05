import Image from "next/image";
import React from "react";

import { Button } from "@/shared/button";

import banner from "@/image/banner/slider-bg-4.webp";
import leafFirst from "@/image/banner-remove-bg/slider-shape-1.webp";
import leafSecond from "@/image/banner-remove-bg/slider-shape-2.webp";
import leafThird from "@/image/banner-remove-bg/slider-shape-3.webp";

const Banner = () => {
  return (
    <div className="banner mt-20 bg-[url('https://orfarm-next-js.vercel.app/assets/img/slider/shape-bg-2.jpg')] pl-4 px-10 pt-24 h-screen relative group mb-7 bg-center md:mt-4">
      <div className="flex items-center justify-between md:block ">
        <div className="content ml-7">
          <h4 className="text-green-ct5 font-semibold text-lg xl:text-sm nm:text-xs">TOP SELLER IN THE WEEK</h4>
          <h2 className="text-blue-ct7 font-bold text-6xl mt-4 mb-4 xl:text-5xl nm:text-4xl">
            The Best <br className="md:hidden" /> Health Fresh.
          </h2>
          <p className="text-blue-ct7 font-medium mb-8 xl:text-sm nm:text-xs">
            Presentation matters. Our fresh Vietnamese vegetable rolls <br /> look good and taste even better
          </p>
          <Button
            types="success"
            className="px-12 py-4 xl:px-10 xl:py-3 nm:px-8 nm:py-3 nm:text-xs rounded-full hover:opacity-100 font-medium duration-500 hover:bg-blue-ct7"
          >
            SHOP NOW
          </Button>
        </div>
        <Image src={banner} alt="" className="xl:w-3/5 md:mt-10 md:m-auto md:!w-4/5" />
      </div>
      <Image src={leafFirst} alt="leaf" className="absolute bottom-24 left-96 group-hover:translate-x-4 duration-500 lg:w-28 lg:h-28 nm:hidden" />
      <Image
        src={leafSecond}
        alt="leaf"
        className="absolute bottom-2 right-60 group-hover:translate-x-4 duration-500 lg:bottom-10 lg:w-40 lg:h-40 nm:hidden"
      />
      <Image
        src={leafThird}
        alt="leaf"
        className="absolute top-2 right-[600px] group-hover:translate-x-4 duration-500 lg:right-[500px] lg:top-12 lg:w-28 lg:h-28 nm:hidden"
      />
    </div>
  );
};

export default Banner;
