import React from "react";
import Image from "next/image";
import large_leaves from "@/image/banner/about-inner-bg.webp";
import checkSuccess from "@/image/icon/check.svg";
import leaf_sprouts from "@/image/icon/icon.png";
import rotating_leaves from "@/image/icon/icon_1_.png";
import farm_vehicle from "@/image/icon/icon_2_.png";

const AboutIntroduction = () => {
  return (
    <div className="about-introduction py-20 px-10 ">
      <div className="flex items-center justify-between">
        <div className="about-left-image md:hidden">
          <Image src={large_leaves} alt="large leaves" />
        </div>
        <div className="about-right-content pr-11 pl-10 xs:pl-0 xs:pr-1">
          <div className="about-tag flex items-center gap-1">
            <h5 className="bg-green-ct5 text-xs flex items-center py-1 px-2 rounded-3xl font-semibold text-white">ABOUT US</h5>
            <span className="text-blue-ct7 text-xs font-bold">WELCOME TO ORFARM</span>
          </div>
          <h3 className="text-4xl mt-4 mb-4 text-blue-ct7 font-bold lg:text-3xl xs:2xl">
            We Help Your <br className="hidden" />
            Digital Business Grow
          </h3>
          <p className="mb-4 text-base text-blue-ct7 font-medium lg:text-sm">
            We provide digital experience services to startups and small businesses. We help our <br />
            clients succeed by creating brand identities, digital experiences, and print materials. Sed <br />
            trspiciatis unde omnis iste natus error sit voluptatem accusantium. Track your daily activity.
          </p>
          <ul>
            <li className="flex items-center gap-2 text-blue-ct7 text-base font-medium mb-2 lg:text-sm">
              <Image className="w-8 h-8" src={checkSuccess} alt="" />
              <span>Track your daily activity.</span>
            </li>
            <li className="flex items-center gap-2 text-blue-ct7 text-base font-medium mb-2 lg:text-sm">
              <Image className="w-8 h-8" src={checkSuccess} alt="" />
              <span>Start a private group video call.</span>
            </li>
            <li className="flex items-center gap-2 text-blue-ct7 text-base font-medium lg:text-sm">
              <Image className="w-8 h-8" src={checkSuccess} alt="" />
              <span>All the lorem ipsum generators on the Internet.</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="boxes mt-20 flex justify-around flex-wrap w-full">
        <div className="box text-center group p-4">
          <Image src={leaf_sprouts} alt="" className="m-auto duration-500 group-hover:-translate-y-2" />
          <h4 className="font-bold text-blue-ct7 mt-2 mb-2">Select Your Products</h4>
          <p className="text-sm text-blue-ct7 font-semibold">
            Choose from select produce to start. <br />
            Keep, add, or remove items.
          </p>
        </div>
        <div className="box text-center group p-4">
          <Image src={rotating_leaves} alt="" className="m-auto duration-500 group-hover:-translate-y-2" />
          <h4 className="font-bold text-blue-ct7 mt-2 mb-2">Our Shop Orfarm</h4>
          <p className="text-sm text-blue-ct7 font-semibold">
            We provide 100+ products, provide <br />
            enough nutrition for your family.
          </p>
        </div>
        <div className="box text-center group p-4">
          <Image src={farm_vehicle} alt="" className="m-auto duration-500 group-hover:-translate-y-2" />
          <h4 className="font-bold text-blue-ct7 mt-2 mb-2">Delivery To Your</h4>
          <p className="text-sm text-blue-ct7 font-semibold">
            Delivery to your door. Up to 100km
            <br />
            and it is completely free.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutIntroduction;
