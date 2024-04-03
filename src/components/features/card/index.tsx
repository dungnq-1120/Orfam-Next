import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/shared/card";
import { Button } from "@/shared/button";
import Rate from "../rate";
import { cn } from "@/lib/utils";
import eye from "@/image/icon/eye.svg";
import { useRouter } from "next/router";
import { fetcherPatch, fetcherPost } from "@/services/callApiService";
import useSWRMutation from "swr/mutation";
import { ApiResponseProductBrandAndCategory } from "@/services/type";
import { useProducts } from "@/hooks/useProducts";
import { useCarts } from "@/hooks/useCart";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  idProduct: string | number;
  imageUrl: string;
  category: string;
  productTitle: string;
  salePercentage: string;
  price: number;
  rating: number;
}

const CardProduct = React.forwardRef<HTMLDivElement, Props>(
  ({ imageUrl, category, productTitle, salePercentage, price, rating, className, idProduct, ...props }, ref) => {
    const router = useRouter();
    const handelDetailProduct = (id: string | number) => {
      router.push(`/shop/products/${id}`);
    };

    const { products } = useProducts<ApiResponseProductBrandAndCategory[]>({ _expand: ["categories", "brands"] });
    const { carts, refreshCarts } = useCarts<ApiResponseProductBrandAndCategory[]>();
    const { trigger: postData } = useSWRMutation("/carts", fetcherPost);
    const { trigger: patchData } = useSWRMutation("/carts", fetcherPatch);


    const handleAddCart = (id: string | number) => {
      if (!products || !carts) return;

      const cart = products.find((product) => product.id === id);
      const cartSame = carts.find((cart) => cart.id === id);

      if (cart && !cartSame) {
        postData(cart);
        refreshCarts();
      }

      if (cart && cartSame) {
        const newCart = { ...cart, quantity: (cart.quantity += 1) };
        patchData(newCart);
      }
    };
    return (
      <Card ref={ref} className={cn("cursor-pointer relative overflow-hidden border-2 border-white", className)}>
        <div onClick={() => handelDetailProduct(idProduct)} className="overflow-hidden w-full h-56 relative group">
          <Image
            src={imageUrl}
            alt="Description of my image"
            width={550}
            height={550}
            className="w-full h-full object-cover scale-100 duration-500 group-hover:scale-110 group-hover:blur-sm"
          />
          <div className="bg-transparent duration-500 w-full h-full absolute top-0 left-0">
            <Button className="absolute opacity-0 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 px-3 py-3 rounded-full bg-green-ct4 duration-500 group-hover:opacity-100 group-hover:bg-green-ct5">
              <Image src={eye} alt="eye" className="w-6 h-6 " />
            </Button>
          </div>
        </div>
        <CardContent onClick={() => handleAddCart(idProduct)} className="bg-gray-100 text-center pt-2 w-full group">
          <h4 className="text-xs font-semibold text-blue-ct7">{category}</h4>
          <p className="text-ctBlue7 text-sm mt-3 mb-3 font-semibold text-blue-ct7 truncate px-2">{productTitle}</p>
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
