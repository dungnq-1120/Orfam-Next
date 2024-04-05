import React from "react";

import AboutIntroduction from "@/components/features/about/aboutContainer";
import AboutInfo from "@/components/features/about/aboutInfo";
import AboutVideo from "@/components/features/about/aboutVideo";
import BannerAbout from "@/components/features/about/bannerAbout";
import PublicLayout from "@/components/layouts/publicLayout";


const About = () => {
  return (
    <div className="about mt-8 pb-16">
      <BannerAbout />
      <AboutIntroduction />
      <AboutInfo />
      <AboutVideo />
    </div>
  );
};

About.getLayout = function getLayout(page: React.ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default About;
