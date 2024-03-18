import React from "react";
import Image, { StaticImageData } from "next/image";
import { Card,  CardContent } from "@/shared/card";
import { Button } from "@/shared/button";
import Rate from "../rate";

interface Props {
  imageUrl: StaticImageData;
  productName: string;
  productDescription: string;
  salePercentage: string;
}

const CardProduct = ({ imageUrl, productName, productDescription, salePercentage }: Props) => {
  return (
    <Card className="cursor-pointer relative group overflow-hidden group">
      <div className="overflow-hidden w-full">
        <Image src={imageUrl} alt="product" className="w-full h-full object-cover scale-100 duration-500 group-hover:scale-110" />
      </div>
      <CardContent className="bg-gray-100 text-center pt-2 w-full">
        <h4 className="text-xs font-semibold text-blue-ct7">{productName}</h4>
        <p className="text-ctBlue7 text-sm mt-3 mb-3 font-semibold text-blue-ct7">{productDescription}</p>
        <Rate rating={5} />
        <h4>
          <span className="text-red-600 text-lg font-bold mr-2">$500.00</span>
          <del className="text-slate-500 text-sm">$700.00</del>
          <Button types="primary" size="full" className="rounded-none mt-1 py-3 duration-500 group-hover:bg-green-ct5 group-hover:opacity-100">
            ADD TO CARD
          </Button>
        </h4>
      </CardContent>
      <CardContent>
        <div className="sale bg-blue-500 text-white text-xs font-semibold z-0 absolute top-2 left-2 p-1 px-2 rounded">{salePercentage}</div>
      </CardContent>
    </Card>
  );
};

export default CardProduct;
