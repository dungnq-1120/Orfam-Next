import React from "react";

import useToastStore from "@/store/useToast";
import { useShallow } from "zustand/react/shallow";

import CardList from "@/components/features/shop/cardList";
import FilterProduct from "@/components/features/shop/filter";
import Layout from "@/components/layouts/publicLayout";

import Toast from "@/shared/toast";

const Shop = () => {
  const { isOpen, message, type } = useToastStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      message: state.message,
      type: state.type,
    }))
  );

  return (
    <div className="shop mt-14 bg-slate-100 py-20 px-10 flex gap-5 relative xl:px-5 lg:block">
      <Toast isOpen={isOpen} message={message} type={type} />
      <FilterProduct />
      <CardList />
    </div>
  );
};

Shop.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Shop;
