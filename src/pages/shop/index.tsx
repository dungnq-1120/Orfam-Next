import React from "react";
import { ToastContainer } from "react-toastify";

import CardList from "@/components/features/shop/cardList";
import FilterProduct from "@/components/features/shop/filter";
import PublicLayout from "@/components/layouts/publicLayout";

const Shop = () => {
  return (
    <div className="shop mt-14 bg-slate-100 py-20 px-10 flex gap-5 relative xl:px-5 lg:block">
      <ToastContainer />
      <FilterProduct />
      <CardList />
    </div>
  );
};

Shop.getLayout = function getLayout(page: React.ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Shop;
