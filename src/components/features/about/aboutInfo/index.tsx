import React from "react";
import about_1 from "@/image/banner/about-1.webp";
import about_2 from "@/image/banner/about-2.webp";
import about_3 from "@/image/banner/about-3.webp";
import Image from "next/image";
const AboutInfo = () => {
  const aboutInfo = [
    {
      image: about_1,
      title: "Who We Are",
      des: "Lorem ipsum dolor sit amet consecteturadipisicing elit, sed do eiusmod tempor laboreet dolore dignissimos cumque.",
    },
    {
      image: about_2,
      title: "Our Products",
      des: "Lorem ipsum dolor sit amet consecteturadipisicing elit, sed do eiusmod tempor laboreet dolore dignissimos cumque.",
    },
    {
      image: about_3,
      title: "How We Work",
      des: "Lorem ipsum dolor sit amet consecteturadipisicing elit, sed do eiusmod tempor laboreet dolore dignissimos cumque.",
    },
  ];
  return (
    <div className="about-info bg-grayBg bg-cover bg-no-repeat pt-10 pb-20">
      <div className="content-heading text-center mt-16">
        <h4 className="text-green-ct5 font-medium md:text-sm">~ Why Choose Us ~</h4>
        <h3 className="text-3xl font-bold text-blue-ct7 mt-4 mb-4 md:text-2xl">Our Amazing Work</h3>
        <p className="text-blue-ct7 text-sm font-medium mb-8 md:xs">The liber tempor cum soluta nobis eleifend option congue doming quod mazim.</p>
      </div>
      <div className="list-about-info flex gap-6 justify-center px-9 csm:flex-wrap">
        {aboutInfo.map((item, index) => (
          <div key={index} className="box w-full overflow-hidden text-center">
            <Image className="w-full" src={item.image} alt="" />
            <h4 className="text-blue-ct7 font-semibold text-2xl my-3 md:text-lg">{item.title}</h4>
            <p className="text-sm text-blue-ct7 font-medium md:text-xs">{item.des}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutInfo;
