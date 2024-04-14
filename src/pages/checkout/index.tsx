import React from "react";
import PrivateLayout from "@/components/layouts/privateLayout";
import CheckoutInfo from "@/components/features/checkout";

const Checkout = () => {
  return (
    <div className="Checkout">
      <CheckoutInfo />
    </div>
  );
};

Checkout.getLayout = function getLayout(page: React.ReactElement) {
  return <PrivateLayout>{page}</PrivateLayout>;
};

export default Checkout;
