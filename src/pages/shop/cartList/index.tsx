import ProductCartList from "@/components/features/cart/productCartList";
import Layout from "@/components/layouts/privateLayout";
import React from "react";

const CartListProducts = () => {
  return (
    <div className="cart-list-products">
      <ProductCartList />
    </div>
  );
};

CartListProducts.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CartListProducts;
