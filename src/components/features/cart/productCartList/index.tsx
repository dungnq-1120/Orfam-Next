import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

import useGetCartsUser from "@/hooks/useGetCartsUser";
import { useDiscounts } from "@/hooks/useDiscount";
import useInfoCheckout from "@/store/useInfoCheckout";

import { Button } from "@/shared/button";
import InputForm from "@/shared/input";

import { TCodeDiscount } from "@/services/type";
import { fetcherDelete, fetcherPatch } from "@/services/callApiService";

import { calculateTotalPrice, calculateTotalPriceDiscount } from "@/utils/totalPrice";
import isDefined from "@/utils/isDefine";
import { isEmptyArray } from "@/utils/isEmptyArray";
import showToast from "@/utils/showToast";

import bin from "@/image/icon/bin.svg";

const ProductCartList = () => {
  const router = useRouter();
  const { setDiscount, setTotal } = useInfoCheckout((state) => ({
    setDiscount: state.setDiscount,
    setTotal: state.setTotal,
  }));
  const { carts, refreshCarts } = useGetCartsUser();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [discountValue, setDiscountValue] = useState<string | null>(null);
  const [valueDiscount, setValueDiscount] = useState<string>("");
  const { discount, refreshDiscounts } = useDiscounts<TCodeDiscount[]>({ code: discountValue }, discountValue ? false : true);

  const { trigger: updateCart } = useSWRMutation("/carts", fetcherPatch);
  const { trigger: deleteCart } = useSWRMutation("/carts", fetcherDelete);

  const updateCartQuantity = async (id: number, delta: number) => {
    const cartIndex = carts.findIndex((cart) => cart.id === id);
    if (cartIndex !== -1) {
      const newQuantity = carts[cartIndex].quantity + delta;
      if (newQuantity > 0) {
        const newCart = { ...carts[cartIndex], quantity: newQuantity };
        await updateCart(newCart);
      }
    }
    refreshCarts();
  };

  const handleDeleteProduct = async (id: number) => {
    const cartIndex = carts.findIndex((cart) => cart.id === id);
    if (cartIndex !== -1) {
      const newCart = { ...carts[cartIndex] };

      await deleteCart(newCart);
      refreshCarts();
      showToast({
        message: `${newCart.title} -1 Remove from cart`,
        type: "warning",
      });
    }
  };

  const handleApplyCoupon = () => {
    setDiscountValue(valueDiscount);
    setValueDiscount("");
    refreshDiscounts();
  };

  useEffect(() => {
    if (discount && discount.length > 0 && discountValue === discount[0].code) {
      showToast({
        message: "Apply discount code successfully",
        type: "success",
      });
    }
    

    if (discount && discount.length === 0) {
      showToast({
        message: "Discount code does not exist",
        type: "error",
      });
    }
  }, [discount, discountValue]);

  const handleCheckout = () => {
    if (discount && discount.length > 0) {
      setDiscount([discount[0]]);
    }
    router.push("/checkout");
  };

  useEffect(() => {
    const total = calculateTotalPrice(carts);
    setTotalPrice(total);
    if (discount && discount.length > 0) {
      const totalPriceDiscount = calculateTotalPriceDiscount({
        totalPrice: total,
        discount: discount[0].sale,
      });
      setTotalPrice(totalPriceDiscount);
      setTotal(totalPrice);
    }
  }, [carts, discount]);

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
            {isDefined(carts) &&
              carts.map((cart) => {
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
      <div className="discount mt-10 sm:block">
        <div className="flex justify-end xss:block">
          <InputForm
            value={valueDiscount}
            onChange={(e) => {
              setValueDiscount(e.target.value);
            }}
            className="border-1 rounded-3xl text-xs py-4 pl-5 mdd:w-2/4 w-1/4 xss:!w-full "
            placeholder="Coupon code"
          />
          <Button
            disabled={discount && discount.length > 0 && discountValue === discount[0].code}
            onClick={handleApplyCoupon}
            className="py-3 px-4 ml-3 rounded-3xl text-base xss:text-sm xss:block xss:w-full xss:ml-0 xss:mt-2"
          >
            Apply Coupon
          </Button>
        </div>
      </div>
      <div className="flex justify-end mt-20">
        <ul className="w-3/6 nm:w-full">
          <li>
            <h3 className="text-2xl mb-2 text-blue-ct7 font-medium">Cart Totals</h3>
          </li>

          <li className="border-1 border-b-0 flex justify-between text-blue-ct7 font-semibold p-3 ">
            <h4>Discount</h4>
            <span className="text-green-500 font-semibold">{discount && discount.length > 0 ? discount[0].name : "No discount code"}</span>
          </li>

          <li className="border-1 flex justify-between text-blue-ct7 font-semibold p-3 ">
            <h4>Total</h4>
            <span className="text-green-500 font-semibold">${totalPrice.toFixed(2)}</span>
          </li>
          <li>
            <Button
              disabled={isEmptyArray(carts)}
              onClick={handleCheckout}
              types="success"
              className="px-8 py-3 rounded-3xl opacity-100 mt-3 text-sm font-semibold hover:bg-blue-ct7 hover:opacity-100 xss:text-xs xss:w-full"
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
