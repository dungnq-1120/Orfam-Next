import CardList from "@/components/features/shop/cardList";
import FilterProduct from "@/components/features/shop/filter";
import Layout from "@/components/layouts/publicLayout";
import Dropdown from "@/shared/dropdown";
import Modal from "@/shared/modal";
import React, { useState } from "react";

const Shop = () => {
  const options = [
    { id: 1, name: "Price Low To High" },
    { id: 2, name: "Default sorting" },
    { id: 3, name: "New Arrivals" },
    { id: 4, name: "Price High To Low" },
  ];
  const [isOpen, setOpen] = useState<boolean>(false);
  const handle = () => {
    setOpen(!isOpen);
  };
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
