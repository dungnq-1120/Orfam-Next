import React from "react";
import type { ReactElement } from "react";
import PublicLayout from "@/components/layouts/publicLayout";
import Banner from "@/components/features/home/banner";
import Introduce from "@/components/features/home/introduce";
import TabsProducts from "@/components/features/home/tabsProducts";
import AboutUs from "@/components/features/home/about";
import SpecialProducts from "@/components/features/home/sliderProducts";
import BlogPost from "@/components/features/home/blogPost";

const Home = () => (
  <>
    <Banner />
    <Introduce />
    <TabsProducts />
    <AboutUs />
    <SpecialProducts />
    <BlogPost />
  </>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Home;
