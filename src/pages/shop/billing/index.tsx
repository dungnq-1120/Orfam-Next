import React from "react";
import Layout from "@/components/layouts/privateLayout";
import Checkout from "@/components/features/checkout";

const Billing = () => {
  return (
    <div className="billing">
      <Checkout />
    </div>
  );
};

Billing.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Billing;
