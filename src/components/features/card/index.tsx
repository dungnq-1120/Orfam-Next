import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/shared/card";
import { Button } from "@/shared/button";
import Rate from "../rate";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  category: string;
  productTitle: string;
  salePercentage: string;
  price: number;
  rating: number;
}

const CardProduct = React.forwardRef<HTMLDivElement, Props>(
  ({ imageUrl, category, productTitle, salePercentage, price, rating, className, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn("cursor-pointer relative overflow-hidden group", className)} {...props}>
        <div className="overflow-hidden w-full h-56">
          <Image
            src={imageUrl}
            alt="Description of my image"
            width={550}
            height={550}
            className="w-full h-full object-cover scale-100 duration-500 group-hover:scale-110"
          />
        </div>
        <CardContent className="bg-gray-100 text-center pt-2 w-full">
          <h4 className="text-xs font-semibold text-blue-ct7">{category}</h4>
          <p className="text-ctBlue7 text-sm mt-3 mb-3 font-semibold text-blue-ct7 truncate px-2">{productTitle}</p>
          <Rate rating={rating} />
          <h4 className="mt-2">
            <span className="text-red-600 text-lg font-bold mr-2">${price}</span>
            <del className="text-slate-500 text-sm">$70.00</del>
            <Button types="primary" size="full" className="rounded-none mt-1 py-3 duration-500 group-hover:bg-green-ct5 group-hover:opacity-100">
              ADD TO CART
            </Button>
          </h4>
        </CardContent>
        <CardContent>
          <div className="sale bg-blue-500 text-white text-xs font-semibold z-0 absolute top-2 left-2 p-1 px-2 rounded">{salePercentage}</div>
        </CardContent>
      </Card>
    );
  }
);

CardProduct.displayName = "CardProduct";

export default CardProduct;
