import Image from "next/image";
import React from "react";
import chicken from "../../../public/image/products30-min.jpg";
import { Button } from "../button";

const Card = () => {
  return (
    <>
      <div className="card w-1/5 cursor-pointer relative group">
        <div className="image overflow-hidden h-60">
          <Image src={chicken} alt="product" className="w-full" />
        </div>
        <div className="content bg-slate-200 p-2">
          <span className="text-gray-500 text-xs">hi</span>
          <h5 className="text-ctBlue7 text-sm font-medium mt-2 mb-2">gà xòa</h5>
          <h4>
            <span className="text-red-600 font-semibold mr-2">$500</span>
            <del className="text-slate-500 text-sm">$200</del>
          </h4>
          <div></div>
        </div>
        <div className="detail opacity-0 group-hover:opacity-100 z-10 absolute top-0 left-0 bg-slate-100 w-full h-full group flex justify-center items-center text-blue-ct5 transition duration-500">
          <div className="translate-y-2 group-hover:translate-y-0 duration-500">
            <ul>
              <li>Type: Organic</li>
              <li>MFG: August 4 2024</li>
              <li>LIFE: 60</li>
            </ul>
            <Button className="group-hover:bg-green-ct5 mt-2 px-10 py-3 rounded duration-500">ADD CART</Button>
          </div>
        </div>
        <div
          className="sale bg-red-500 text-white z-0 absolute top-1
        left-1 p-1 px-2 rounded"
        >
          50%
        </div>
      </div>
    </>
  );
};

export default Card;
