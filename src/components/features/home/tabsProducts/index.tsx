import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/shared/tabs/index";
import cherry from "@/image/product/product-img-15.webp";
import CardProduct from "../../card";
import { TabsContent } from "@/shared/tabs/index";

interface Props {
  label: string;
  value: string;
}

const TabsProducts = () => {
  const tabData: Props[] = [
    { label: "Fruit Drink", value: "fruit-drink" },
    { label: "Fresh Meat", value: "fresh-meat" },
    { label: "Vegetables", value: "vegetables" },
    { label: "Biscuits Snack", value: "biscuit-snack" },
  ];

  return (
    <div className="tabsProducts p-10 flex justify-center">
      <div className="w-full border-t-2 py-16 ">
        <div className="content-heading text-center">
          <h4 className="text-green-ct5 font-medium">~ Special Products ~</h4>
          <h3 className="text-3xl font-bold text-blue-ct7 mt-4 mb-8">Weekly Food Offers</h3>
        </div>
        <div className="tabs">
          <Tabs defaultValue="fruit-drink" className="w-full m-auto ">
            <div className="flex justify-center items-center mb-6 ">
              <TabsList className="w-2/5 py-6 bg-blue-ct7 xl:w-3/5 nm:w-4/5 sm:bg-transparent md:!w-full md:bg md:mb-10">
                {tabData.map((tab) => (
                  <TabsTrigger key={tab.value} className="flex-1 -translate-y-2/4  md:rounded-none sm:-translate-y-0 bg-blue-ct7 text-white" value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {tabData.map((tab) => (
              <TabsContent className="flex flex-wrap justify-center gap-4" key={tab.label} value={tab.value}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CardProduct key={index} imageUrl={cherry} productName={tab.label} productDescription="Chicken from USA" salePercentage="50%" />
                ))}
              </TabsContent>
            ))}
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
