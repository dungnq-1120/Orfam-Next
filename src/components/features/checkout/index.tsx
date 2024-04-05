import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/shared/button";
import { Form, FormField, FormItem, FormMessage } from "@/shared/form";
import InputForm from "@/shared/input";



import { z } from "zod";

const checkoutSchema = z.object({
  name: z.string().min(1, "Please enter your name").trim(),
  phone: z.string().min(1, "Please enter your phone").trim(),
  email: z.string().email(" Please enter invalid email format").trim(),
  address: z.string().min(1, "Please enter your address").trim(),
});

interface TOptionShip {
  type: string;
  price: number;
  label: string;
}

interface TFormBilling {
  name: string;
  phone: string;
  email: string;
  address: string;
}

const Checkout = () => {
  const [selectedOption, setSelectedOption] = useState<TOptionShip>({ type: "standard", price: 7.0, label: "Standard delivery" });

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
    { name: "name", placeholder: "Full name" } as const,
    { name: "phone", placeholder: "Phone" } as const,
    { name: "email", placeholder: "Email" } as const,
    { name: "address", placeholder: "Address" } as const,
  ];

  const deliveryOptions = [
    { type: "fast", price: 10.0, label: "Fast delivery" },
    { type: "standard", price: 7.0, label: "Standard delivery" },
  ];

  const onSubmit = (data: TFormBilling) => {
    console.log(data);
  };

  const handleOptionClick = (option: TOptionShip) => {
    setSelectedOption(option);
  };
  return (
    <div className="mt-20 py-10 flex items-center">
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
        <div className="shipping-option">
          <h3 className="text-blue-ct7 font-semibold text-xl border-b-1 p-3 my-5">Delivery Method</h3>
          {deliveryOptions.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={selectedOption && selectedOption.type === option.type ? "active bg-green-ct5 mx-2 text-white " : "mx-2"}
            >
              {option.label}: <span className="text-semibold ml-1"> ${option.price.toFixed(2)}</span>
            </Button>
          ))}
        </div>
      </div>
      <div className="checkout-product-detail w-full border-2 border-green-ct5 p-4">
        <h3 className="text-blue-ct7 font-semibold text-xl border-b-1 p-3 mb-6">Your order</h3>
        <ul>
          <li className="flex justify-between p-3 border-1 border-b-0 text-blue-ct7 font-medium">
            <h6>Product</h6> <span>Guava Leaves From Trees Grown In South × 1</span>
          </li>
          <li className="flex justify-between p-3 border-1 border-b-0 text-blue-ct7 font-medium">
            <h6>Total</h6> <span className="text-red-600">$30.00</span>
          </li>
          <li className="flex justify-between p-3 border-1 border-b-0 text-blue-ct7 font-medium">
            <h6>Cart Subtotal</h6> <span className="text-red-600">$30.00</span>
          </li>
          <li className="flex justify-between p-3 border-1 border-b-0 text-blue-ct7 font-medium">
            <h6>Shipping</h6>
            <span className="text-green-500">{selectedOption ? `${selectedOption.label}: $${selectedOption.price.toFixed(2)}` : ""}</span>
          </li>
          <li className="flex justify-between p-3 border-1 text-blue-ct7 font-medium">
            <h6>Order Total</h6> <span className="text-green-600 text-lg">$31.00</span>
          </li>
        </ul>
        <Button className="px-16 w-full py-3 duration-500 hover:bg-green-ct5 sm:w-full xs:text-xs mt-6" onClick={form.handleSubmit(onSubmit)}>
          Place order
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
