import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useRouter } from "next/router";
import { useCarts } from "@/hooks/useCart";
import useSWRMutation from "swr/mutation";

import { useProfile } from "@/hooks/useProfile";

import type { TMyProfile } from "../../checkout/type";

import { Button } from "@/shared/button";
import InputForm from "@/shared/input";

import { ApiResponseProductBrandAndCategory } from "@/services/type";
import { fetcherDelete, fetcherPatch } from "@/services/callApiService";
import { calculateTotalPrice } from "@/utils/totalPrice";
import isDefined from "@/utils/isDefine";
import { isEmptyArray } from "@/utils/isEmptyArray";
import showToast from "@/utils/showToast";

import bin from "@/image/icon/bin.svg";
import useGetCartsUser from "@/hooks/useGetCartsUser";

const ProductCartList = () => {
  const router = useRouter();
  const { carts, refreshCarts } = useCarts<ApiResponseProductBrandAndCategory[]>();
  const { trigger: updateCart } = useSWRMutation("/carts", fetcherPatch);
  const { trigger: deleteCart } = useSWRMutation("/carts", fetcherDelete);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const cartsUser = useGetCartsUser();

  const updateCartQuantity = (id: number, delta: number) => {
    const cartIndex = carts.findIndex((cart) => cart.id === id);
    if (cartIndex !== -1) {
      const newQuantity = carts[cartIndex].quantity + delta;
      if (newQuantity > 0) {
        const newCart = { ...carts[cartIndex], quantity: newQuantity };
        updateCart(newCart);
        refreshCarts();
      }
    }
  };

  const handleDeleteProduct = (id: number) => {
    const cartIndex = carts.findIndex((cart) => cart.id === id);
    if (cartIndex !== -1) {
      const newCart = { ...carts[cartIndex] };
      deleteCart(newCart);
      refreshCarts();
      showToast({
        message: `${newCart.title} -1 Remove from cart`,
        type: "warning",
      });
    }
  };

  useEffect(() => {
    const totalPrice = calculateTotalPrice(carts);
    setTotalPrice(totalPrice);
  }, []);

  return (
    <div className="product-cart-list mt-20 py-16 px-4">
      <div className="nm:overflow-x-auto">
        <table className="t w-full border-collapse nm:w-[200%] sm:!w-[350%]">
          <thead>
            <tr>
              <th className="border-1 p-2 text-sm text-blue-ct5">Images</th>
              <th className="border-1 p-2 text-sm text-blue-ct5">Courses</th>
              <th className="border-1 p-2 text-sm text-blue-ct5">Unit Price</th>
              <th className="border-1 p-2 text-sm text-blue-ct5">Quantity</th>
              <th className="border-1 p-2 text-sm text-blue-ct5">Total</th>
              <th className="border-1 p-2 text-sm text-blue-ct5">Remove</th>
            </tr>
          </thead>
          <tbody>
            {isDefined(cartsUser) &&
              cartsUser.map((cart) => {
                return (
                  <tr key={cart.id}>
                    <td className="border-1">
                      <Image width={550} height={550} src={cart.image} alt="" className="w-32 h-32 m-auto" />
                    </td>
                    <td className="border-1 text-center text-sm font-semibold text-blue-ct7">{cart.title}</td>
                    <td className="border-1 text-center text-base font-semibold text-red-600">
                      $<span>{cart.price.toFixed(2)}</span>
                    </td>
                    <td className="border-1 ">
                      <div className="flex justify-center">
                        <div className="inline-flex items-center bg-gray-100 shadow-lg rounded-3xl py-1 w-28 xs:!flex xs:mt-4">
                          <Button
                            onClick={() => updateCartQuantity(cart.id, -1)}
                            className="text-blue-ct6 px-0 py-0 w-full h-full flex justify-center items-center text-4xl leading-none bg-transparent"
                          >
                            -
                          </Button>
                          <InputForm
                            className="text-blue-ct6 p-0 font-semibold w-full text-center h-full border-0 bg-transparent"
                            value={cart.quantity}
                            readOnly
                          />
                          <Button
                            onClick={() => updateCartQuantity(cart.id, 1)}
                            className="text-blue-ct6 px-0 py-0 w-full h-full flex justify-center items-center text-2xl bg-transparent"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </td>
                    <td className="border-1 text-center text-base font-semibold text-green-500">${(cart.quantity * cart.price).toFixed(2)}</td>
                    <td onClick={() => handleDeleteProduct(cart.id)} className="border-1 group cursor-pointer">
                      <div className="flex justify-center">
                        <Button className="bg-white shadow-lg group-hover:bg-red-200">
                          <Image src={bin} alt="" className="w-6 h-6" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="discount mt-10 flex justify-end sm:block">
        <InputForm className="border-1 rounded-3xl text-xs py-4 pl-5 w-1/4 sm:w-full sm:mb-3" placeholder="Coupon code" />
        <Button className="py-3 px-4 ml-3 rounded-3xl text-base sm:w-full sm:ml-0">Apply Coupon</Button>
      </div>
      <div className="flex justify-end mt-20">
        <ul className="w-3/6 nm:w-full">
          <li>
            <h3 className="text-2xl mb-2 text-blue-ct7 font-medium">Cart Totals</h3>
          </li>
          <li className="border-1 flex justify-between text-blue-ct7 font-semibold p-3 ">
            <h4>Total</h4>
            <span className="text-green-500 font-semibold">${totalPrice.toFixed(2)}</span>
          </li>
          <li>
            <Button
              disabled={isEmptyArray(carts)}
              onClick={() => {
                router.push("/checkout");
              }}
              types="success"
              className="px-8 py-3 rounded-3xl opacity-100 mt-3 text-sm font-semibold hover:bg-blue-ct7 hover:opacity-100"
            >
              PROCEED TO CHECKOUT
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductCartList;
