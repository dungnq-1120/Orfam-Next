import React, { useEffect, useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useSWRMutation from "swr/mutation";

import { useBrands } from "@/hooks/useBrand";
import useDebounce from "@/hooks/useDebounce";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";

import Admin from "..";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Edit } from "@/icons/feature/Edit";

import { FormField, FormItem } from "@/shared/form";
import InputForm from "@/shared/input";
import { Button } from "@/shared/button";
import Modal from "@/shared/modal";

import { fetcherDelete, fetcherPatch, fetcherPost } from "@/services/callApiService";

import type { ApiResponseProductBrandAndCategory, Product, TBrandAndCategories } from "@/services/type";

import showToast from "@/utils/showToast";
import isDefined from "@/utils/isDefine";

import bin from "@/image/icon/bin.svg";
import { Search } from "@/icons/info/Search";

const ProductInfo = z.object({
  title: z.string().min(1, "Please enter your title product").trim(),
  price: z.coerce.number().min(1, "Please enter your price"),
  quantity: z.coerce.number().min(1, "Please enter your quantity"),
  image: z.string().min(1, "Please enter your image product").trim(),
  rate: z.coerce.number().min(1, "Please enter your rate"),
  status: z.string().min(1, "Please enter your status").trim(),
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
    },
  });

  const formFields = [
    { name: "title", placeholder: "Please enter your title product" } as const,
    { name: "price", placeholder: "Please enter your price" } as const,
    { name: "quantity", placeholder: "Please enter your quantity" } as const,
    { name: "image", placeholder: "Please enter your image product" } as const,
    { name: "rate", placeholder: "Please enter your rate" } as const,
    { name: "status", placeholder: "Please enter your status" } as const,
  ];
  const tableTitleProducts = ["Image", "Title", "Price", "Quantity", "Rate", "Status", "Brand", "Category", "Action"];

  const [isEditProduct, setIsEditProduct] = useState<boolean>(false);
  const [isModalSearch, setOpenSearch] = useState<boolean>(false);
  const [idProduct, setIdProduct] = useState<number | null>(null);
  const [valueSearch, setValueSearch] = useState<string>("");
  const [isOpenModalProduct, setIsOpenModalProduct] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState<TBrandAndCategories | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<TBrandAndCategories | null>(null);

  const { categories, refreshCategories } = useCategories();
  const { brands, refreshBrand } = useBrands();
  const debounceValue = useDebounce(valueSearch, 2000);
  const { products, refreshProducts } = useProducts<ApiResponseProductBrandAndCategory[]>({
    _expand: ["categories", "brands"],
    title_like: debounceValue,
  });

  const { trigger: addProduct, isMutating: isMutingAddProduct } = useSWRMutation("/products", fetcherPost);
  const { trigger: updateProduct, isMutating: isMutingUpdateProduct } = useSWRMutation("/products", fetcherPatch);
  const { trigger: deleteProduct, isMutating: isMutingDeleteProduct } = useSWRMutation("/products", fetcherDelete);

  const onSubmit = (data: Omit<Product, "category" | "brand">) => {
    if (!idProduct) {
      if (selectedBrand && selectedCategory) {
        const newData = { ...data, brandsId: selectedBrand.id, categoriesId: selectedCategory.id };
        addProduct(newData);
        showToast({
          message: `Add product ${data.title} success`,
          type: "success",
        });
      }
    } else {
      const newData = { ...data, id: idProduct };
      updateProduct(newData);
    }

    form.reset({
      title: "",
      price: 0,
      image: "",
      rate: 0,
      quantity: 0,
      status: "",
    });
    setIsOpenModalProduct(false);
    setSelectedBrand(null);
    setSelectedCategory(null);
    refreshProducts();
  };

  const handleSelectBrand = (brandName: string) => {
    const brand = brands?.find((brand) => brand.name === brandName);
    if (brand) {
      setSelectedBrand(brand);
    }
  };

  const handleSelectCategories = (categoriesName: string) => {
    const category = categories?.find((category) => category.name === categoriesName);
    if (category) {
      setSelectedCategory(category);
    }
  };

  const handleEditProduct = (product: ApiResponseProductBrandAndCategory) => {
    const brand = brands?.find((brand) => brand.id === product.brandsId);
    const category = categories?.find((category) => category.id === product.categoriesId);
    form.reset({
      title: product.title,
      price: product.price,
      image: product.image,
      rate: product.rate,
      quantity: product.quantity,
      status: product.status,
    });
    setIsOpenModalProduct(true);
    if (brand && category) {
      setSelectedBrand(brand);
      setSelectedCategory(category);
    }
    setIdProduct(product.id);
    setIsEditProduct(true);
  };

  const handleCancelEditProduct: () => void = () => {
    form.reset({
      title: "",
      price: 0,
      image: "",
      rate: 0,
      quantity: 0,
      status: "",
    });
    setIdProduct(null);
    setIsOpenModalProduct(false);
    setSelectedBrand(null);
    setSelectedCategory(null);
  };

  const handleDeleteProduct = async (product: ApiResponseProductBrandAndCategory) => {
    await deleteProduct(product);
    refreshProducts();
    showToast({
      message: `You just deleted the ${product.title} product`,
      type: "warning",
    });
  };

  return (
    <>
      <div>
        <div className="shadow-shadow2 p-5 bg-white rounded-md">
          <div className="flex justify-between mb-10">
            <h3 className="p-3 font-semibold text-blue-ct7 text-lg">PRODUCTS</h3>
            <div className="flex item-center gap-4">
              <InputForm
                value={valueSearch}
                onChange={(e) => {
                  setValueSearch(e.target.value);
                }}
                placeholder="Search"
                className={`w-0 p-0 border-0 text-sm ${
                  isModalSearch ? "w-[300px] duration-500 bg-gray-100 py-3 px-3" : "w-0 duration-500 bg-gray-100 py-0"
                }`}
              />
              <Button
                onClick={() => {
                  setOpenSearch(!isModalSearch);
                }}
                className="rounded-full h-12 w-12 bg-blue-200"
              >
                <Search className="w-6 h-6 text-blue-ct7" />
              </Button>
              <Button
                onClick={() => {
                  setIsOpenModalProduct(true);
                }}
                className="bg-blue-ct5"
              >
                ADD PRODUCT
              </Button>
            </div>
          </div>

          {/* <InputForm
          value={valueSearch}
          onChange={(e) => {
            setValueSearch(e.target.value);
          }}
          types="success"
          className="py-2 mb-5 rounded text-sm border-1 w-1/4 nm:w-2/4 sm:!w-3/4"
          placeholder="Search product"
        /> */}
          <div className="overflow-auto h-[450px] ">
            <table className=" w-[130%] csm:w-[250%] csm:text-xs xs:!w-[340%]">
              <thead className="sticky -top-1 bg-white ">
                <tr>
                  {tableTitleProducts.map((item) => (
                    <th key={item} className="border-b-1 border-slate-200 py-4 px-3 text-blue-ct5">
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isDefined(products) &&
                  products.map((product) => (
                    <tr key={product.id} className="text-center text-sm">
                      <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-blue-ct7">
                        <Image width={550} height={550} className="w-20 h-20 m-auto" src={product.image} alt="" />
                      </td>
                      <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-orange-500">{product.title}</td>
                      <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-green-500">{product.price.toFixed(2)}</td>
                      <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-blue-600">{product.quantity}</td>
                      <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-orange-600">{product.rate}</td>
                      <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-red-500">
                        <span className="p-1 bg-red-200  rounded">{product.status}</span>
                      </td>
                      <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-blue-ct7">
                        <span className="bg-green-200 text-green-700 px-2 py-1 rounded">{product.brands?.name}</span>
                      </td>
                      <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-blue-ct7">
                        <span className="p-1 bg-orange-200 text-orange-500 rounded px-2 py-1">{product.categories?.name}</span>
                      </td>
                      <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold ">
                        <div className="flex flex-col items-center">
                          <Button
                            disabled={isMutingUpdateProduct}
                            onClick={() => {
                              handleDeleteProduct(product);
                            }}
                            className="w-28 font-semibold py-3 mb-2 bg-white shadow-lg hover:bg-red-200"
                          >
                            <Image src={bin} alt="" className="w-6 h-6" />
                          </Button>
                          <Button
                            onClick={() => {
                              handleEditProduct(product);
                            }}
                            className="w-28 font-semibold py-3 mb-2 bg-white shadow-lg hover:bg-green-200"
                          >
                            <Edit className="w-6 h-6" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal className="opacity-50" onCancel={setIsOpenModalProduct} isOpenModal={isOpenModalProduct}>
        <div className="w-[700px] bg-white p-5 rounded-lg">
          <h3 className="text-blue-ct7 text-lg font-semibold">ADD PRODUCT</h3>
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
            <label className="text-start text-xs text-blue-ct7 font-semibold block mt-4 mb-2">Your Brand</label>
            <select
              value={selectedBrand?.name}
              onChange={(e) => {
                handleSelectBrand(e.target.value);
              }}
              className="bg-gray-50 border outline-none border-gray-300 text-blue-ct7 font-semibold text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" className="text-blue-ct7 font-semibold">
                Choose a brand
              </option>
              {brands &&
                brands.map((brand) => (
                  <option key={brand.id} value={brand.name} className="text-blue-ct7 font-semibold">
                    {brand.name}
                  </option>
                ))}
            </select>
            <label className="text-start text-xs text-blue-ct7 font-semibold block mt-4 mb-2">Your Category</label>
            <select
              value={selectedCategory?.name}
              onChange={(e) => {
                handleSelectCategories(e.target.value);
              }}
              className="bg-gray-50 border outline-none border-gray-300 text-blue-ct7 font-semibold text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" className="text-blue-ct7 font-semibold">
                Choose a category
              </option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.name} className="text-blue-ct7 font-semibold">
                    {category.name}
                  </option>
                ))}
            </select>

            {!isEditProduct ? (
              <Button type="submit" disabled={isMutingAddProduct} className="mt-5 w-full py-3 font-semibold">
                CREATE PRODUCT
              </Button>
            ) : (
              <>
                <Button type="submit" disabled={isMutingUpdateProduct} className="mt-5 w-full py-3 font-semibold">
                  APPLY
                </Button>
                <Button onClick={handleCancelEditProduct} types="error" type="button" className="mt-5 w-full py-3 font-semibold">
                  CANCEL
                </Button>
              </>
            )}
          </form>
        </div>
      </Modal>
    </>
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
