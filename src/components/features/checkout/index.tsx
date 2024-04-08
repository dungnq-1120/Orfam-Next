import React, { useEffect, useState } from "react";
import { z } from "zod";
import useSWRMutation from "swr/mutation";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCarts } from "@/hooks/useCart";
import { useUser } from "@/hooks/useUser";
import { useOrders } from "@/hooks/useOrder";

import { Button } from "@/shared/button";
import { Form, FormField, FormItem, FormMessage } from "@/shared/form";
import InputForm from "@/shared/input";

import { fetcherPost } from "@/services/callApiService";

import type { ApiResponseProductBrandAndCategory } from "@/services/type";
import type { TFormBilling, TOptionShip, TOrder, TUser } from "./type";

import isDefined from "@/utils/isDefine";
import { calculateTotalPrice } from "@/utils/totalPrice";

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
  const [selectedOption, setSelectedOption] = useState<TOptionShip>(deliveryOptions[0]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { carts } = useCarts<ApiResponseProductBrandAndCategory[]>();
  const { orders, refreshOrders } = useOrders<TOrder[]>();
  const { user } = useUser<TUser>();
  const { trigger: addOrder } = useSWRMutation("/orders", fetcherPost);

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

  const onSubmit = (data: TFormBilling) => {
    if (user) {
      addOrder({ ...data, shipping: selectedOption, carts });
      refreshOrders();
      router.push("/bill");
    }
  };

  useEffect(() => {
    const totalPrice = calculateTotalPrice(carts);

    if (selectedOption.price) {
      setTotalPrice(totalPrice + selectedOption.price);
    }

    if (user) {
      form.reset({
        name: user.name,
        phone: "",
        email: user.email,
        address: "",
      });
    }
  }, [carts, selectedOption.price, user]);

  return (
    <>
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
                        className="rounded-none border-1 mt-6 text-sm xs:text-xs"
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
                className={selectedOption && selectedOption.type === option.type ? "active bg-green-ct5 mx-2 mt-3 text-white " : "mx-2"}
              >
                {option.label}: <span className="text-semibold ml-1"> ${option.price.toFixed(2)}</span>
              </Button>
            ))}
          </div>
        </div>
        <div className="checkout-product-detail w-full border-2 border-green-ct5 p-4 lg:border-0">
          <h3 className="text-blue-ct7 font-semibold text-xl border-b-1 p-3 mb-6">Your order</h3>
          <div className="flex items-center">
            <ul className="w-3/4 xs:w-4/5">
              <li className="pb-3 text-blue-ct7 font-semibold">Product</li>
              {isDefined(carts) &&
                carts.map((cart) => (
                  <li key={cart.id} className="border-1 truncate border-x-0 border-b-0 py-3 pl-2 font-medium text-blue-ct7 sm:text-xs xs:pl-0 ">
                    {cart.title} x{cart.quantity}
                  </li>
                ))}
              <li className="border-1 border-x-0 border-t-1 py-3 font-medium text-blue-ct7 sm:text-sm">Shipping</li>
              <li className="border-1 border-x-0 border-t-0 py-3 font-medium text-blue-ct7">Order Total</li>
            </ul>
            <ul className="w-1/4 xs:w-1/5">
              <li className="pb-3 text-blue-ct7 font-semibold xs:text-end">Total</li>
              {isDefined(carts) &&
                carts.map((cart) => (
                  <li key={cart.id} className="border-1 border-x-0 py-3 font-medium border-b-0 text-green-500 sm:text-xs xs:text-end">
                    ${(cart.price * cart.quantity).toFixed(2)}
                  </li>
                ))}
              <li className="border-1 border-x-0 border-t-1 py-3 font-medium text-green-500 sm:text-sm xs:text-end">
                {selectedOption ? `$${selectedOption.price.toFixed(2)}` : ""}
              </li>
              <li className="border-1 border-x-0 border-t-0 py-3 font-semibold text-red-500 text-base xs:text-end">${totalPrice.toFixed(2)}</li>
            </ul>
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
