import React from "react";
import icon1 from "@/image/icon/choose-icon1.svg";
import icon2 from "@/image/icon/choose-icon2.svg";
import icon3 from "@/image/icon/choose-icon3.svg";
import icon4 from "@/image/icon/choose-icon4.svg";
import Image from "next/image";

const AboutUs = () => {
  const aboutInfo = [
    {
      icon: icon1,
      title: "100% Fresh Food",
      description: "Adjust global theme options and see design changes in real-time.",
    },
    {
      icon: icon2,
      title: "Premium Quality",
      description: "Adjust global theme options and see design changes in real-time.",
    },
    {
      icon: icon3,
      title: "100% Natural",
      description: "Adjust global theme options and see design changes in real-time.",
    },
    {
      icon: icon4,
      title: "100% Organic",
      description: "Adjust global theme options and see design changes in real-time.",
    },
  ];

  return (
    <div className="about-us bg-grayBg bg-no-repeat bg-cover bg-center py-24 px-7">
      <div className="content-heading text-center">
        <h4 className="text-green-ct5 font-medium">~ Why choose us? ~</h4>
        <h3 className="text-3xl font-bold text-blue-ct7 mt-4 mb-4">What makes us different</h3>
        <p className="font-medium text-sm text-blue-ct7">The liber tempor cum soluta nobis eleifend option congue doming quod mazim.</p>
      </div>
      <div className="group-about flex justify-center gap-4 mt-10 w-full flex-wrap ">
        {aboutInfo.map((item, index) => (
          <div key={index} className="box group w-80 bg-white text-center py-10 px-14 rounded-3xl cursor-pointer nm:w-full">
            <Image src={item.icon} alt="" className="m-auto duration-500 group-hover:-translate-y-1" />
            <h4 className="font-bold text-blue-ct7 mt-4">{item.title}</h4>
            <p className="text-sm font-medium text-blue-ct7 mt-2 mb-2">{item.description}</p>
            <div className="relative inline-block">
              <span className="text-green-ct5 font-semibold text-xs">LEARN MORE</span>
              <span className="absolute bottom-0 rounded-full left-0 w-0 duration-500 group-hover:w-full h-px bg-blue-ct7"></span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-sm mt-10 font-medium text-blue-ct7">
        Our nearly 1.4K committed staff members are ready to help. <span className="text-green-ct5 font-semibold cursor-pointer">Help Center</span>{" "}
      </p>
    </div>
  );
};

export default AboutUs;
