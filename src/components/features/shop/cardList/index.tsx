import Dropdown from "@/shared/dropdown";
import React from "react";
import cherry from "@/image/product/product-img-15.webp";
import CardProduct from "../../card";

const CardList = () => {
  const options = [
    { id: 1, name: "Price Low To High" },
    { id: 2, name: "Default sorting" },
    { id: 3, name: "New Arrivals" },
    { id: 4, name: "Price High To Low" },
  ];

  return (
    <div className="card-shop w-3/4 lg:w-full">
      <div className="shop-text-heading bg-[url('https://orfarm-next-js.vercel.app/assets/img/banner/shop-bg-1.jpg')] text-white text-center py-10 rounded-xl">
        <h4 className="text-sm text-yellow-300 font-semibold sm:text-xs">THE SALAD</h4>
        <h3 className="text-2xl my-3 font-bold sm:text-xl">
          Fresh & Natural <br />
          Healthy Food Special Offer
        </h3>
        <p className="font-medium text-sm sm:text-xs">Do not miss the current offers of us!</p>
      </div>
      <div className="bg-white shadow-xl mt-4 rounded-xl px-8 py-4 flex justify-between sm:block">
        <h4 className="text-sm text-blue-ct7 font-semibold">Showing 1 - 10 of 25 Products</h4>
        <Dropdown options={options} />
      </div>
      <div className="flex flex-wrap gap-3 mt-5 justify-center">
        {Array.from({ length: 10 }).map((_, index) => (
          <CardProduct key={index} imageUrl={cherry} productName="Cherry" productDescription="Chicken from USA" salePercentage="50%" />
        ))}
      </div>
    </div>
  );
};

export default CardList;
