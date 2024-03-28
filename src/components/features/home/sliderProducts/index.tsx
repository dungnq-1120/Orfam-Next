import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import previous from "@/image/icon/left.png";
import CardProduct from "../../card";
import { Button } from "@/shared/button";
import Image from "next/image";
import { useProducts } from "@/hooks/useProducts";
import isDefined from "@/utils/isDefine";
import Loadings from "@/shared/loadings";

const SpecialProducts = () => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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

  const { products, isLoading } = useProducts({
    _expand: "categories",
  });

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
            {isLoading && <Loadings types="primary" size="md" />}
            <Slider className="flex" ref={sliderRef} {...settings}>
              {isDefined(products) &&
                products.map((product) => {
                  return (
                    <CardProduct
                      key={product.id}
                      imageUrl={product.image}
                      category={product.categories.name}
                      productTitle={product.title}
                      price={product.price}
                      salePercentage={product.status}
                      rating={product.rating.rate}
                      className="w-56"
                    />
                  );
                })}
            </Slider>
          </div>
          <Button types="success" className="prev-btn absolute rounded-full px-2 py-2 -left-4 top-2/4 -translate-y-2/4" onClick={goToPrevSlide}>
            <Image className="w-8 h-8" src={previous} alt="" />
          </Button>
          <Button types="success" className="next-btn absolute -right-4 px-2 py-2 rounded-full top-2/4 -translate-y-2/4" onClick={goToNextSlide}>
            <Image className="w-8 h-8 rotate-180" src={previous} alt="" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpecialProducts;
