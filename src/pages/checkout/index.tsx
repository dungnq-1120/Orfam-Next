import React from "react";
import Layout from "@/components/layouts/publicLayout";
import CheckoutInfo from "@/components/features/checkout";

const Checkout = () => {
  return (
    <div className="Checkout">
      <CheckoutInfo />
    </div>
  );
};

Checkout.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Checkout;
