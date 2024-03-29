import { Button } from "@/shared/button";
import Checkbox from "@/shared/checkbox";
import React from "react";
import Rate from "../../rate";

const FilterProduct = () => {
  return (
    <div className="filter-product overflow-y-scroll h-[510px] self-start bg-white px-10 py-6 w-1/4 rounded-xl shadow-2xl sticky top-32 xl:p-5 lg:w-full lg:relative lg:top-0 lg:mb-10">
      <div className="filter-categories">
        <h3 className="text-sm text-blue-ct7 font-semibold">PRODUCT CATEGORIES</h3>
        <ul className="mt-5">
          <li className="flex items-center gap-1 my-2">
            <Checkbox className="focus:shadow-none" />
            <h4 className="text-sm text-blue-ct7 font-medium">
              Vegetables <span>(2)</span>
            </h4>
          </li>
          <li className="flex items-center gap-1 my-2">
            <Checkbox className="focus:shadow-none" />
            <h4 className="text-sm text-blue-ct7 font-medium">
              Vegetables <span>(2)</span>
            </h4>
          </li>
          <li className="flex items-center gap-1 my-2">
            <Checkbox className="focus:shadow-none" />
            <h4 className="text-sm text-blue-ct7 font-medium">
              Vegetables <span>(2)</span>
            </h4>
          </li>
        </ul>
      </div>
      <div className="filter-price mt-4 border-t-1 border-b-1 border-green-ct5 py-5">
        <h3 className="text-sm text-blue-ct7 font-semibold">FILTER BY PRICE</h3>
        <input type="range" className="range-track accent-green-ct5 w-full h-1 appearance-none bg-green-ct5 rounded-lg" />
        <h4 className="my-4">
          $<span>0</span> - $<span>400</span>
        </h4>
        <Button types="success">FILTER</Button>
      </div>
      <div className="filter-brand mt-4">
        <h3 className="text-sm text-blue-ct7 font-semibold">FILTER BY BRAND</h3>
        <ul className="mt-5">
          <li className="flex items-center gap-2 my-2">
            <Checkbox className="focus:shadow-none" />
            <h4 className="text-sm text-blue-ct7 font-medium">
              Super Market <span>(2)</span>
            </h4>
          </li>
        </ul>
      </div>
      <div className="filter-rating mt-4 border-t-1 border-green-ct5 pt-5">
        <h3 className="text-sm text-blue-ct7 font-semibold">FILTER BY RATING</h3>
        <ul className="mt-5">
          <li className="flex items-center gap-2 my-2">
            <Checkbox className="focus:shadow-none" />
            <Rate rating={5} />
            <span className="text-blue-ct7 text-sm font-medium">(5 start)</span>
          </li>
          <li className="flex items-center gap-2 my-2">
            <Checkbox className="focus:shadow-none" />
            <Rate rating={4} />
            <span className="text-blue-ct7 text-sm font-medium">(4 start)</span>
          </li>
          <li className="flex items-center gap-2 my-2">
            <Checkbox className="focus:shadow-none" />
            <Rate rating={3} />
            <span className="text-blue-ct7 text-sm font-medium">(3 start)</span>
          </li>
          <li className="flex items-center gap-2 my-2">
            <Checkbox className="focus:shadow-none" />
            <Rate rating={2} />
            <span className="text-blue-ct7 text-sm font-medium">(2 start)</span>
          </li>
          <li className="flex items-center gap-2 my-2">
            <Checkbox className="focus:shadow-none" />
            <Rate rating={1} />
            <span className="text-blue-ct7 text-sm font-medium">(1 start)</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FilterProduct;
