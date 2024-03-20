import React from "react";
import cherry from "@/image/product/product-img-15.webp";
import payments from "@/image/icon/payment-2.webp";
import Image from "next/image";
import { Button } from "@/shared/button";
import InputForm from "@/shared/input";

const InfoProduct = () => {
  return (
    <div className="info-product gap-2 w-full">
      <div className=" shadow-xl p-5">
        <div className="py-5 inline-block">
          <h3 className="font-semibold text-2xl text-blue-ct7 xs:text-xl">Guava Leaves From Trees Grown In South</h3>
          <ul className="flex justify-between mt-3 text-sm text-blue-ct7 font-medium xs:text-xs">
            <li>
              Brands: <span className="text-green-ct5 font-semibold">Super Market</span>
            </li>
            <li>
              SKU: <span className="text-green-ct5 font-semibold">005</span>
            </li>
          </ul>
        </div>
        <div className="product-content-detail border-t-1 flex gap-5 pt-6 nm:items-center csm:block">
          <div className="overflow-hidden w-full h-full">
            <Image src={cherry} alt="" className="w-full h-full object-cover csm:w-2/4 csm:h-2/4 csm:m-auto xs:w-full xs:h-full" />
          </div>
          <div className="detail w-full">
            <h3 className="text-red-600 font-semibold text-2xl xs:text-xl">$ 35.00</h3>
            <ul className="list-disc text-blue-ct6 text-sm font-medium pl-5 mt-3 pb-4 border-b-1 xs:text-xs">
              <li>Delicious non - dairy cheese sauce</li>
              <li className="my-1">Vegan & Allergy friendly</li>
              <li>Smooth, velvety dairy free cheese sauce</li>
            </ul>
            <div className="quantity-product flex items-center gap-5 py-6 border-b-1 xs:block">
              <span className="text-sm font-semibold text-blue-ct7 xs:block xs:text-center">QTY:</span>
              <div className="inline-flex items-center bg-gray-100 rounded-3xl py-1 w-28 xs:!flex xs:w-full xs:mt-4">
                <Button className="text-blue-ct7 px-0 py-0 w-full h-full flex justify-center items-center text-4xl leading-none bg-transparent">
                  -
                </Button>
                <InputForm className="text-blue-ct7 p-0 font-semibold w-full text-center h-full border-0 bg-transparent" value="1" />
                <Button className="text-blue-ct7 px-0 py-0 w-full h-full flex justify-center items-center text-2xl bg-transparent">+</Button>
              </div>
              <Button types="success" className="py-3 px-12 rounded-3xl xs:w-full xs:mt-4">
                ADD TO CART
              </Button>
            </div>
            <ul className="pt-6 text-sm font-medium text-blue-ct7 xs:text-xs">
              <li>
                Availability: <span className="text-green-400 font-semibold">50 In stock</span>
              </li>
              <li className="my-2">Categories: Vegetables</li>
              <li>Tags: Apricots, Fresh</li>
            </ul>
            <div className="bg-gray-200 text-center py-4 rounded-lg mt-5">
              <Image className="m-auto px-3" src={payments} alt="" />
              <span className="text-blue-ct7 font-medium text-sm mt-3 block xs:text-xs">Guarantee safe & Secure checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoProduct;
