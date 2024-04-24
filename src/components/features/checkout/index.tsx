import React, { useEffect, useState } from "react";
import { z } from "zod";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useProfile } from "@/hooks/useProfile";
import useGetCartsUser from "@/hooks/useGetCartsUser";
import { useOrders } from "@/hooks/useOrder";
import useToken from "@/hooks/useToken";
import useInfoCheckout from "@/store/useInfoCheckout";

import { Button } from "@/shared/button";
import { Form, FormField, FormItem, FormMessage } from "@/shared/form";
import InputForm from "@/shared/input";
import Modal from "@/shared/modal";

import { fetcherPost } from "@/services/callApiService";

import type { TFormBilling, TMyProfile, TOptionShip, TOrder } from "./type";

import { TRACKING } from "@/services/type";

import isDefined from "@/utils/isDefine";

const checkoutSchema = z.object({
  name: z.string().min(1, "Please enter your name").trim(),
  phone: z.string().min(1, "Please enter your phone").trim(),
  email: z.string().email(" Please enter invalid email format").trim(),
  address: z.string().min(1, "Please enter your address").trim(),
});

const CheckoutInfo = () => {
  const deliveryOptions = [
    { type: "fast", price: 10, label: "Fast delivery" },
    { type: "standard", price: 7, label: "Standard delivery" },
  ];

  const router = useRouter();
  const { discount, total } = useInfoCheckout((state) => ({
    discount: state.discount,
    total: state.total,
  }));

  const [selectedOption, setSelectedOption] = useState<TOptionShip>(deliveryOptions[0]);
  const [isOpenModalAttention, setOpenModalAttention] = useState<boolean>(false);
  const { profile } = useProfile<TMyProfile>({ disable: false });
  const { trigger: addOrder } = useSWRMutation("/orders", fetcherPost);
  const { carts, refreshCarts } = useGetCartsUser();
  const tokenInfo = useToken();
  const { refreshOrders } = useOrders<TOrder[]>({ _expand: "userCarts", userCartsId: tokenInfo && tokenInfo.id }, { disable: !tokenInfo });

  const form = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
  });

  const formFields = [
    { name: "name", placeholder: "Consignee name" } as const,
    { name: "phone", placeholder: "Consignee phone" } as const,
    { name: "email", placeholder: "Consignee Email" } as const,
    { name: "address", placeholder: "Consignee address" } as const,
  ];

  const onSubmit = async (data: TFormBilling) => {
    const totalPrice = total + selectedOption.price;

    await addOrder({
      ...data,
      carts: carts,
      discount: discount,
      shipping: selectedOption,
      totalPrice: totalPrice,
      status: TRACKING.PACKED,
      userCartsId: carts[0].userCartsId,
    });
    refreshOrders();
    router.push("/bill");
  };

  useEffect(() => {
    if (profile && !form.getValues().name && !form.getValues().phone && !form.getValues().email && !form.getValues().address) {
      form.reset({
        name: profile.data.name,
        phone: profile.data.phone,
        email: profile.data.email,
        address: profile.data.address,
      });
    }
  }, [carts, selectedOption.price, profile]);

  return (
    <>
      <Modal isOpenModal={isOpenModalAttention} onCancel={setOpenModalAttention}>
        <div className="p-5"></div>
      </Modal>
      <div className="mt-20 py-10 flex items-center lg:flex-wrap">
        <div className="w-full p-4">
          <h3 className="text-blue-ct7 font-semibold text-xl border-b-1 p-3">Billing Details</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              {formFields.map(({ name, placeholder }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem>
                      <InputForm
                        types="success"
                        fullWidth
                        className="rounded-none text-blue-ct7 font-medium border-1 mt-6 text-sm xs:text-xs"
                        placeholder={placeholder}
                        {...field}
                      />
                      <FormMessage className="xs:text-xs" />
                    </FormItem>
                  )}
                />
              ))}
            </form>
          </Form>
          <div className="shipping-option lg:border-b-1 lg:pb-5">
            <h3 className="text-blue-ct7 font-semibold text-xl border-b-1 p-2 my-5 ">Delivery Method</h3>
            {deliveryOptions.map((option, index) => (
              <Button
                key={index}
                onClick={() => {
                  setSelectedOption(option);
                }}
                className={`xs:mb-1 xs:w-full ${
                  selectedOption && selectedOption.type === option.type ? "active bg-green-ct5 mx-2 mt-3 text-white " : "mx-2"
                }`}
              >
                {option.label}: <span className="text-semibold ml-1"> ${option.price.toFixed(2)}</span>
              </Button>
            ))}
          </div>
        </div>
        <div className="checkout-product-detail w-full border-2 border-green-ct5 p-4 lg:border-0">
          <h3 className="text-blue-ct7 font-semibold text-xl border-b-1 p-3 mb-6">Your order</h3>
          <div className="">
            <table className="w-full xss:text-xs">
              <thead>
                <tr>
                  <th className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-orange-500 text-start">Product</th>
                </tr>
              </thead>
              <tbody>
                {isDefined(carts) &&
                  carts.map((cart) => (
                    <tr key={cart.id}>
                      <td className="border-b-1 flex justify-between border-slate-200 py-3 px-5 font-semibold text-blue-500">
                        <span className="pr-2">
                          {cart.title} x{cart.quantity}
                        </span>
                        <span className="text-green-500">{cart.price.toFixed(2)}</span>
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td className="border-b-1 flex justify-between border-slate-200 py-3 px-3 font-semibold text-orange-500">
                    <span>Discount</span>
                    <span className="text-green-500"> {discount && discount.length > 0 && discount[0].name}</span>
                  </td>
                </tr>
                <tr>
                  <td className="border-b-1 flex justify-between border-slate-200 py-3 px-3 font-semibold text-orange-500">
                    <span>Shipping</span>
                    <span className="text-green-500">{selectedOption ? `${selectedOption.price.toFixed(2)}` : ""}</span>
                  </td>
                </tr>
                <tr>
                  <td className="border-b-1 flex justify-between border-slate-200 py-3 px-3 font-semibold text-orange-500">
                    <span>Total</span>
                    <span className="text-green-500">{selectedOption && (total + selectedOption.price).toFixed(2)}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Button className="px-16 w-full py-3 duration-500 hover:bg-green-ct5 sm:w-full xs:text-xs  mt-6" onClick={form.handleSubmit(onSubmit)}>
            Place order
          </Button>
        </div>
      </div>
    </>
  );
};

export default CheckoutInfo;
