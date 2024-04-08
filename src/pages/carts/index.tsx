import React from "react";
import { ToastContainer } from "react-toastify";

import ProductCartList from "@/components/features/cart/productCartList";
import Layout from "@/components/layouts/publicLayout";

const CartListProducts = () => {
  return (
    <>
      <div className="cart-list-products">
        <ToastContainer />
        <ProductCartList />
      </div>
    </>
  );
};

CartListProducts.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CartListProducts;
