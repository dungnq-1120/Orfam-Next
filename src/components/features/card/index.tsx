import React, { useState } from "react";
import Image from "next/image";

import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";
import { useProducts } from "@/hooks/useProducts";
import { useProfile } from "@/hooks/useProfile";
import useGetCartsUser from "@/hooks/useGetCartsUser";
import useToken from "@/hooks/useToken";

import { Card, CardContent } from "@/shared/card";
import { Button } from "@/shared/button";

import type { ApiResponseProductBrandAndCategory } from "@/services/type";
import type { TMyProfile } from "../checkout/type";

import { cn } from "@/lib/utils";
import showToast from "@/utils/showToast";
import { fetcherPatch, fetcherPost } from "@/services/callApiService";

import Rate from "../rate";

import eyeImg from "@/image/icon/eye.svg";

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, "id"> {
  id: number;
  thumbnail: string;
  category: string;
  name: string;
  salePercentage: string;
  price: number;
  rating: number;
}
interface TCartsUser {
  id: number;
  name: string;
}

const CardProduct = React.forwardRef<HTMLDivElement, Props>(
  ({ thumbnail, category, name, salePercentage, price, rating, className, id, ...props }, ref) => {
    const router = useRouter();
    const tokenInfo = useToken();
    const { profile } = useProfile<TMyProfile>({ disable: !tokenInfo });
    const { products } = useProducts<ApiResponseProductBrandAndCategory[]>({ _expand: ["categories", "brands"] });
    const { carts, refreshCarts } = useGetCartsUser();

    const { trigger: addToCart } = useSWRMutation("/carts", fetcherPost);
    const { trigger: updateCart } = useSWRMutation("/carts", fetcherPatch);

    const handelDetailProduct = (id: number) => {
      router.push(`/shop/products/${id}`);
    };

    const handleAddCart = (id: number) => {
      if (tokenInfo) {
        const product = products?.find((product) => product.id === id);
        if (product) {
          const cart = carts.find((cart) => cart.id === product.id);

          if (!cart) {
            addToCart({ ...product, userCartsId: profile?.data.id });
            refreshCarts();
            showToast({
              message: `${product.title} successfully added to cart`,
              type: "success",
            });
          } else {
            if (carts.length > 0) {
              const newCart = { ...cart, quantity: (cart.quantity += 1) };
              updateCart(newCart);
              refreshCarts();
              showToast({
                message: `1 ${product.title} updated to cart`,
                type: "success",
              });
            }
          }
        }

        refreshCarts();
      } else {
        showToast({
          message: "Please login",
          type: "error",
        });
      }
    };

    return (
      <Card {...props} ref={ref} className={cn("cursor-pointer relative overflow-hidden border-1 border-gray-200", className)}>
        <div onClick={() => handelDetailProduct(id)} className="overflow-hidden w-full h-56 relative group">
          <Image
            src={thumbnail}
            alt="Description of my image"
            width={550}
            height={550}
            className="w-full h-full object-cover scale-100 duration-500 group-hover:scale-110 group-hover:blur-sm"
          />
          <div className="bg-transparent duration-500 w-full h-full absolute top-0 left-0">
            <Button className="absolute opacity-0 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 px-3 py-3 rounded-full bg-green-ct4 duration-500 group-hover:opacity-100 group-hover:bg-green-ct5">
              <Image src={eyeImg} alt="eyeImg" className="w-6 h-6 " />
            </Button>
          </div>
        </div>
        <CardContent onClick={() => handleAddCart(id)} className="bg-gray-100 text-center pt-2 w-full group">
          <h4 className="text-xs font-semibold text-blue-ct7">{category}</h4>
          <p className="text-ctBlue7 text-sm mt-3 mb-3 font-semibold text-blue-ct7 truncate px-2">{name}</p>
          <Rate rating={rating} />
          <h4 className="mt-2">
            <span className="text-red-600 text-lg font-bold mr-2">${price.toFixed(2)}</span>
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
