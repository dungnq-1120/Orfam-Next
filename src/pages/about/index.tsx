import AboutIntroduction from "@/components/features/about/aboutContainer";
import AboutInfo from "@/components/features/about/aboutInfo";
import AboutVideo from "@/components/features/about/aboutVideo";
import BannerAbout from "@/components/features/about/bannerAbout";
import Layout from "@/components/layouts/publicLayout";
import React from "react";

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
  return <Layout>{page}</Layout>;
};

export default About;
