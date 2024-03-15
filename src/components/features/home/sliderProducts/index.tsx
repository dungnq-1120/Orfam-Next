import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cherry from "@/image/product/product-img-15.webp";
import previous from "@/image/icon/left.png";
import CardProduct from "../../card";
import { Button } from "@/shared/button";
import Image from "next/image";

const SpecialProducts = () => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
  };

  const goToNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const goToPrevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  return (
      <div className="specialProducts pt-16 pb-10">
        <div className="content-heading text-center">
          <h4 className="text-green-ct5 font-medium">~ Special Products ~</h4>
          <h3 className="text-3xl font-bold text-blue-ct7 mt-4 mb-4">Weekly Food Offers</h3>
          <p className="text-blue-ct7 text-sm font-medium">The liber tempor cum soluta nobis eleifend option congue doming quod mazim.</p>
        </div>
        <div className="slider-products w-11/12 m-auto py-20 relative">
          <div className="">
            <div className="slider-container">
              <Slider ref={sliderRef} {...settings}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <CardProduct key={index} imageUrl={cherry} productName="Cherry" productDescription="Chicken from USA" salePercentage="50%" />
                ))}
              </Slider>
            </div>
            <Button types="success" className="prev-btn absolute rounded-full px-2 py-2 -left-8 top-2/4 -translate-y-2/4" onClick={goToPrevSlide}>
              <Image className="w-8 h-8" src={previous} alt="" />
            </Button>
            <Button types="success" className="next-btn absolute -right-8 px-2 py-2 rounded-full top-2/4 -translate-y-2/4" onClick={goToNextSlide}>
              <Image className="w-8 h-8 rotate-180" src={previous} alt="" />
            </Button>
          </div>
        </div>
      </div>
  );
};

export default SpecialProducts;
