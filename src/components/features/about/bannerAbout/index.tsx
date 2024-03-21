import React from "react";

const BannerAbout = () => {
  return (
    <div className="flex justify-center items-center h-screen text-center bg-banner_about bg-no-repeat bg-cover sm:px-3">
      <div className="about-heading text-white">
        <h4 className="font-bold xs:text-sm ">ABOUT FOR ORFARM</h4>
        <h2 className="text-6xl font-bold mt-6 mb-6 sm:text-5xl xs:text-4xl">Unique People</h2>
        <p className="font-medium text-sm sm:text-xs">
          Over 25 years of experience, we have crafted thousands of strategic discovery process that <br /> enables us to peel back the layers which
          enable us to understand, connect.
        </p>
      </div>
    </div>
  );
};

export default BannerAbout;
