import React, { useEffect, useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useBrands } from "@/hooks/useBrand";
import useDebounce from "@/hooks/useDebounce";

import Admin from "..";
import AdminLayout from "@/components/layouts/AdminLayout";

import { FormField, FormItem } from "@/shared/form";
import InputForm from "@/shared/input";
import { Button } from "@/shared/button";

import { fetcherDelete, fetcherPatch, fetcherPost } from "@/services/callApiService";
import useSWRMutation from "swr/mutation";
import { ApiResponseProductBrandAndCategory, Product } from "@/services/type";
import showToast from "@/utils/showToast";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import isDefined from "@/utils/isDefine";

const ProductInfo = z.object({
  title: z.string().min(1, "Please enter your title product").trim(),
  price: z.coerce.number().min(1, "Please enter your title product"),
  quantity: z.coerce.number().min(1, "Please enter your quantity"),
  image: z.string().min(1, "Please enter your image product").trim(),
  rate: z.coerce.number().min(1, "Please enter your rate"),
  status: z.string().min(1, "Please enter your status").trim(),
  brand: z.string().min(1, "Please enter your status").trim(),
  category: z.string().min(1, "Please enter your status").trim(),
});

const CreateProduct = () => {
  const form = useForm({
    resolver: zodResolver(ProductInfo),
    defaultValues: {
      title: "",
      price: 0,
      image: "",
      rate: 0,
      quantity: 1,
      status: "",
      brand: "",
      category: "",
    },
  });

  const formFields = [
    { name: "title", placeholder: "Please enter your title product" } as const,
    { name: "price", placeholder: "Please enter your price" } as const,
    { name: "quantity", placeholder: "Please enter your quantity" } as const,
    { name: "image", placeholder: "Please enter your image product" } as const,
    { name: "rate", placeholder: "Please enter your rate" } as const,
    { name: "status", placeholder: "Please enter your status" } as const,
    { name: "brand", placeholder: "Please enter your brand" } as const,
    { name: "category", placeholder: "Please enter your category" } as const,
  ];
  const tableTitleProducts = ["Title", "Price", "Image", "Rate", "Status", "Brand", "Category", "Action"];

  const [categoriesId, setCategoriesId] = useState<number>(1);
  const [brandsId, setBrandsId] = useState<number>(1);
  const [isEditProduct, setIsEditProduct] = useState<boolean>(false);
  const [idProduct, setIdProduct] = useState<number>(0);
  const [valueSearch, setValueSearch] = useState<string>("");

  const { categories, refreshCategories } = useCategories();
  const { brands, refreshBrand } = useBrands();
  const debounceValue = useDebounce(valueSearch, 2000);
  const { products, refreshProducts } = useProducts<ApiResponseProductBrandAndCategory[]>({
    _expand: ["categories", "brands"],
    title_like: debounceValue,
  });

  const { trigger: addProduct } = useSWRMutation("/products", fetcherPost);
  const { trigger: addCategories } = useSWRMutation("/categories", fetcherPost);
  const { trigger: addBrand } = useSWRMutation("/brands", fetcherPost);
  const { trigger: updateProduct } = useSWRMutation("/products", fetcherPatch);
  const { trigger: deleteProduct } = useSWRMutation("/products", fetcherDelete);

  const onSubmit = (data: Product) => {
    const findCategoriesName = categories?.find((category) => category.name === data.category);
    const findBrandName = brands?.find((brand) => brand.name === data.brand);
    const { category, brand, ...dataFormProduct } = data;

    if (!isEditProduct) {
      if (findCategoriesName && findBrandName) {
        addProduct({ ...dataFormProduct, categoriesId: findCategoriesName.id, brandsId: findBrandName.id });
      } else {
        addProduct({ ...dataFormProduct, categoriesId: categoriesId, brandsId: brandsId });
        addCategories({ id: categoriesId, name: category });
        addBrand({ id: brandsId, name: brand });
        setBrandsId(brandsId + 1);
        setCategoriesId(categoriesId + 1);
      }

      refreshBrand();
      refreshCategories();
      refreshProducts();

      showToast({
        message: `Success add product ${data.title}`,
        type: "success",
      });
    } else {
      const product = products?.find((product) => product.id === idProduct);

      if (data.category === product?.categories.name) {
        updateProduct({ ...dataFormProduct, id: idProduct });
      } else {
        const findCategoriesProduct = categories?.find((category) => category.name === data.category);
        const dataUpdateCategories = { ...dataFormProduct, categoriesId: findCategoriesProduct?.id };
        updateProduct({ ...dataUpdateCategories, id: idProduct });
      }

      if (data.brand === product?.brands.name) {
        updateProduct({ ...dataFormProduct, id: idProduct });
      } else {
        const findBrandProduct = brands?.find((brand) => brand.name === data.brand);
        const dataUpdateBrand = { ...dataFormProduct, brandsId: findBrandProduct?.id };
        updateProduct({ ...dataUpdateBrand, id: idProduct });
      }
    }

    form.reset({
      title: "",
      price: 0,
      image: "",
      rate: 0,
      quantity: 1,
      status: "",
      brand: "",
      category: "",
    });

    refreshProducts();
    setIsEditProduct(false);
  };

  const handleEditProduct = (product: ApiResponseProductBrandAndCategory) => {
    form.reset({
      title: product.title,
      price: product.price,
      image: product.image,
      rate: product.rate,
      quantity: product.quantity,
      status: product.status,
      brand: product.brands.name,
      category: product.categories.name,
    });

    setIdProduct(product.id);
    setIsEditProduct(true);
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
          {!isEditProduct ? (
            <Button type="submit" className="mt-5 w-full py-3">
              CREATE PRODUCT
            </Button>
          ) : (
            <Button type="submit" className="mt-5 w-full py-3">
              APPLY EDIT
            </Button>
          )}
        </form>
      </div>
      <div className="shadow-shadow2 p-5 mt-10">
        <h3 className="p-3 font-semibold text-blue-ct7 text-lg">PRODUCT LIST</h3>
        <InputForm
          value={valueSearch}
          onChange={(e) => {
            setValueSearch(e.target.value);
          }}
          types="success"
          className="py-2 mb-5 rounded text-sm border-1 w-1/4 nm:w-2/4 sm:!w-3/4"
          placeholder="Search product"
        />
        <div className="overflow-auto h-96">
          <table className="border-collapse border w-[130%] csm:w-[250%] csm:text-xs xs:!w-[340%]">
            <thead className="sticky -top-1 bg-white">
              <tr>
                {tableTitleProducts.map((item) => (
                  <th key={item} className="border border-slate-600 py-3 px-3">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isDefined(products) &&
                products.map((product) => (
                  <tr key={product.id} className="text-center text-sm">
                    <td className="border border-slate-600 py-3 px-3 font-semibold text-blue-ct7">{product.title}</td>
                    <td className="border border-slate-600 py-3 px-3 font-semibold text-blue-ct7">{product.price}</td>
                    <td className="border border-slate-600 py-3 px-3 font-semibold text-blue-ct7">
                      <Image width={550} height={550} className="w-20 h-20 m-auto" src={product.image} alt="" />
                    </td>
                    <td className="border border-slate-600 py-3 px-3 font-semibold text-blue-ct7">{product.rate}</td>
                    <td className="border border-slate-600 py-3 px-3 font-semibold text-blue-ct7">{product.status}</td>
                    <td className="border border-slate-600 py-3 px-3 font-semibold text-blue-ct7">{product.brands.name}</td>
                    <td className="border border-slate-600 py-3 px-3 font-semibold text-blue-ct7">{product.categories.name}</td>
                    <td className="border border-slate-600 py-3 px-3 font-semibold text-blue-ct7">
                      <div className="flex flex-col items-center">
                        <Button
                          onClick={() => {
                            deleteProduct(product);
                            refreshProducts();
                            showToast({
                              message: `You just deleted the ${product.title} product`,
                              type: "warning",
                            });
                          }}
                          className="w-28 font-semibold py-3 mb-2 bg-red-500"
                        >
                          DELETE
                        </Button>
                        <Button
                          onClick={() => {
                            handleEditProduct(product);
                          }}
                          className="w-28 font-semibold py-3 bg-green-500"
                        >
                          EDIT
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              {products?.length === 0 &&
                tableTitleProducts.map((item) => (
                  <td className="border border-slate-600 py-3 text-xs px-3 font-semibold text-center text-blue-ct7" key={item}>
                    NO PRODUCT
                  </td>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
CreateProduct.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AdminLayout>
      <Admin>{page}</Admin>
    </AdminLayout>
  );
};
export default CreateProduct;
