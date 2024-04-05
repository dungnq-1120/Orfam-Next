import ProductCartList from "@/components/features/cart/productCartList";
import Layout from "@/components/layouts/publicLayout";
import Toast from "@/shared/toast";
import useToastStore from "@/store/useToast";
import React from "react";
import { useShallow } from "zustand/react/shallow";

const CartListProducts = () => {
  const { isOpen, message, type } = useToastStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      message: state.message,
      type: state.type,
    }))
  );
  return (
    <div className="cart-list-products">
      <Toast isOpen={isOpen} message={message} type={type} />
      <ProductCartList />
    </div>
  );
};

CartListProducts.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CartListProducts;
