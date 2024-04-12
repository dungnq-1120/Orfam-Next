import React from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Admin from "..";
import PrivateLayout from "@/components/layouts/privateLayout";

import { FormField, FormItem } from "@/shared/form";
import InputForm from "@/shared/input";
import { Button } from "@/shared/button";

import cherry from "@/image/product/product-img-15.webp";

const ProductInfo = z.object({
  title: z.string().min(1, "Please enter your title product").trim(),
  price: z.string().min(1, "Please enter your price").trim(),
  image: z.string().min(1, "Please enter your image product").trim(),
  rate: z.string().min(1, "Please enter your rate").trim(),
  status: z.string().min(1, "Please enter your status").trim(),
  brand: z.string().min(1, "Please enter your status").trim(),
  brandsId: z.string().min(1, "Please enter your brandsId").trim(),
  category: z.string().min(1, "Please enter your status").trim(),
  categoriesId: z.string().min(1, "Please enter your categoriesId").trim(),
});

const CreateProduct = () => {
  const form = useForm({
    resolver: zodResolver(ProductInfo),
    defaultValues: {
      title: "",
      price: "",
      image: "",
      rate: "",
      status: "",
      brand: "",
      brandsId: "",
      category: "",
      categoriesId: "",
    },
  });

  const formFields = [
    { name: "title", placeholder: "Please enter your title product" } as const,
    { name: "price", placeholder: "Please enter your price" } as const,
    { name: "image", placeholder: "Please enter your image product" } as const,
    { name: "rate", placeholder: "Please enter your rate" } as const,
    { name: "status", placeholder: "Please enter your status" } as const,
    { name: "brand", placeholder: "Please enter your brand" } as const,
    { name: "brandsId", placeholder: "Please enter your brandsId" } as const,
    { name: "category", placeholder: "Please enter your category" } as const,
    { name: "categoriesId", placeholder: "Please enter your categoriesId" } as const,
  ];

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <div className="shadow-shadow2 p-3">
        <h3 className="font-semibold text-center text-xl text-blue-ct7">CREATE PRODUCT</h3>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {formFields.map(({ name, placeholder }) => (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <label className="text-start text-xs text-blue-ct7 font-semibold block mt-4">Your {name}</label>
                  <InputForm
                    types="success"
                    fullWidth
                    className="border-1 mt-6 text-xs py-3 rounded-md font-medium"
                    placeholder={placeholder}
                    {...field}
                  />
                  {form.formState.errors[name] && (
                    <span className="text-red-500 text-start block text-xs">{form.formState.errors[name].message}</span>
                  )}
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="mt-5 w-full py-3">
            CREATE PRODUCT
          </Button>
        </form>
      </div>
      <div className="shadow-shadow2 p-5 mt-10">
        <h3 className="p-3 font-semibold text-blue-ct7 text-lg">PRODUCT LIST</h3>
        <div className="overflow-x-auto">
          <table className="border-collapse border w-[200%] csm:w-[250%] csm:text-xs xs:!w-[350%]">
            <thead>
              <tr>
                <th className="border border-slate-600 py-3  px-3">Title</th>
                <th className="border border-slate-600 py-3  px-3">Price</th>
                <th className="border border-slate-600 py-3  px-3">Image</th>
                <th className="border border-slate-600 py-3  px-3">Rate</th>
                <th className="border border-slate-600 py-3  px-3">Status</th>
                <th className="border border-slate-600 py-3  px-3">Brand</th>
                <th className="border border-slate-600 py-3  px-3">BrandsId</th>
                <th className="border border-slate-600 py-3  px-3">Category</th>
                <th className="border border-slate-600 py-3  px-3">CategoriesId</th>
                <th className="border border-slate-600 py-3  px-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="border border-slate-600 py-3 px-3 font-semibold text-blue-ct7">Orange Very Vip Pro</td>
                <td className="border border-slate-600 py-3 px-3 font-semibold text-blue-ct7">7.00</td>
                <td className="border border-slate-600 py-3 px-3 font-semibold text-blue-ct7">
                  <Image className="w-20 h-20 m-auto" src={cherry} alt="" />
                </td>
                <td className="border border-slate-600 py-3 px-3 font-semibold text-blue-ct7">5</td>
                <td className="border border-slate-600 py-3 px-3 font-semibold text-blue-ct7">Sale</td>
                <td className="border border-slate-600 py-3 px-3 font-semibold text-blue-ct7">Supper Market</td>
                <td className="border border-slate-600 py-3 px-3 font-semibold text-blue-ct7">1</td>
                <td className="border border-slate-600 py-3 px-3 font-semibold text-blue-ct7">Fresh meat</td>
                <td className="border border-slate-600 py-3 px-3 font-semibold text-blue-ct7">2</td>
                <td className="border border-slate-600 py-3 px-3 font-semibold text-blue-ct7">
                  <div className="flex flex-col items-center">
                    <Button className="w-28 font-semibold py-3 mb-2 bg-red-500">DELETE</Button>
                    <Button className="w-28 font-semibold py-3 bg-green-500">EDIT</Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
CreateProduct.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <PrivateLayout>
      <Admin>{page}</Admin>
    </PrivateLayout>
  );
};
export default CreateProduct;
