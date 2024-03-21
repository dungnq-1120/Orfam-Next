import ProductDetail from "@/components/features/cart/productDetail";
import Layout from "@/components/layouts/privateLayout";
import React from "react";

const CartDetail = () => {
  return (
    <div className="cart-detail mt-24 pt-10 px-4 relative">
      <ProductDetail />
    </div>
  );
};

CartDetail.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CartDetail;
