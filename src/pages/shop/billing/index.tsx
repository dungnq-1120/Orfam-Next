import React from "react";
import CheckOut from "@/components/features/checkout";
import Layout from "@/components/layouts/privateLayout";

const Billing = () => {
  return (
    <div className="billing">
      <CheckOut />
    </div>
  );
};

Billing.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Billing;
