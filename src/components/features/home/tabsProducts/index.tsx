import React, { useState } from "react";

import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";

import { Tabs, TabsList, TabsTrigger } from "@/shared/tabs/index";
import Loading from "@/shared/loading";
import { TabsContent } from "@/shared/tabs/index";

import { ApiResponseProduct } from "@/services/type";

import CardProduct from "../../card";

import isDefined from "@/utils/isDefine";

const TabsProducts = () => {
  const [idCategory, setIdCategory] = useState(1);
  const { products, isLoading: loadingProducts } = useProducts<ApiResponseProduct[]>({ categoriesId: idCategory });
  const { categories, isLoading: loadingCategories } = useCategories();

  return (
    <div className="tabsProducts p-10 flex justify-center">
      <div className="w-full border-t-2 py-16 ">
        <div className="content-heading text-center">
          <h4 className="text-green-ct5 font-medium">~ Special Products ~</h4>
          <h3 className="text-3xl font-bold text-blue-ct7 mt-4 mb-8">Weekly Food Offers</h3>
        </div>
        <div className="tabs">
          <Tabs defaultValue="Fresh Fruits" className="w-full m-auto ">
            <div className="flex justify-center items-center mb-6 ">
              <TabsList className="w-3/5 py-6 bg-blue-ct7 lg:w-4/5 nm:w-4/5 sm:bg-transparent md:!w-full md:bg md:mb-10">
                {loadingCategories && <Loading containerClassName="-mt-3" />}
                {isDefined(categories) &&
                  categories.map((category) => {
                    return (
                      <TabsTrigger
                        key={category.id}
                        className="flex-1 -translate-y-2/4 md:rounded-none sm:-translate-y-0 bg-blue-ct7 text-white"
                        value={category.name}
                        onClick={() => {
                          setIdCategory(category.id);
                        }}
                      >
                        {category.name}
                      </TabsTrigger>
                    );
                  })}
              </TabsList>
            </div>
            {loadingCategories && <Loading types="primary" size="md" />}
            {categories &&
              categories.map((category) => {
                return (
                  <TabsContent className="flex flex-wrap justify-center gap-4 xs:mt-20 " key={category.id} value={category.name}>
                    {loadingProducts && <Loading types="primary" size="md" />}
                    {isDefined(products) &&
                      products
                        .slice(0, 6)
                        .map((product) => (
                          <CardProduct
                            key={product.id}
                            id={product.id}
                            thumbnail={product.image}
                            category={category.name}
                            name={product.title}
                            price={product.price}
                            salePercentage={product.status}
                            rating={product.rate}
                            className="w-56"
                          />
                        ))}
                  </TabsContent>
                );
              })}
          </Tabs>
        </div>
        <p className="text-center mt-8 font-medium text-blue-ct7">
          Discover thousands of other quality products. <span className="text-green-ct5 font-semibold cursor-pointer">Shop All Products</span>{" "}
        </p>
      </div>
    </div>
  );
};

export default TabsProducts;
