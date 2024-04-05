import React from "react";
import ProductDetail from "@/components/features/cart/productDetail";
import Layout from "@/components/layouts/publicLayout";


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
