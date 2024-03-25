import CardList from "@/components/features/shop/cardList";
import FilterProduct from "@/components/features/shop/filter";
import Layout from "@/components/layouts/publicLayout";
import React from "react";

const Shop = () => {
  return (
    <div className="shop mt-14 py-20 px-10 flex gap-5 relative xl:px-5 lg:block">
      <FilterProduct />
      <CardList />
    </div>
  );
};

Shop.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Shop;
