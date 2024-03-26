import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/shared/tabs/index";
import CardProduct from "../../card";
import { TabsContent } from "@/shared/tabs/index";
import rippleLoading from "@/image/banner/Ripple-1s-200px.gif";
import spinnerLoading from "@/image/banner/Spinner-1s-200px.gif";
import Image from "next/image";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategory";

const TabsProducts = () => {
  const [idCategory, setIdCategory] = useState(1);
  const { products } = useProducts(`?categoriesId=${idCategory}`);
  const { categories } = useCategories();

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
                {categories ? (
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
                  })
                ) : (
                  <div className="xl:w-3/5 nm:w-4/5 bg-blue-ct7 flex justify-center items-center sm:h-14">
                    <Image src={spinnerLoading} alt="" className="w-10 h-10 -mt-5 sm:mt-0" />
                  </div>
                )}
              </TabsList>
            </div>
            {categories ? (
              categories.map((category) => {
                return (
                  <TabsContent className="flex flex-wrap justify-center gap-4 xs:mt-20 " key={category.id} value={category.name}>
                    {products
                      ? products
                          .slice(0, 6)
                          .map((product) => (
                            <CardProduct
                              key={product.id}
                              imageUrl={product.image}
                              productType={category.name}
                              productTitle={product.title}
                              price={product.price}
                              salePercentage={product.status}
                              rating={product.rating.rate}
                              className="w-56"
                            />
                          ))
                      : ""}
                  </TabsContent>
                );
              })
            ) : (
              <Image src={rippleLoading} alt="" className="w-56 h-56 m-auto" />
            )}
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
