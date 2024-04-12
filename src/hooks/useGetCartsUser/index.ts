import { ApiResponseProductBrandAndCategory } from "@/services/type";
import React, { useEffect } from "react";
import { useProfile } from "../useProfile";
import { TMyProfile } from "@/components/features/checkout/type";
import { useCarts } from "../useCart";

const useGetCartsUser = () => {
  const { carts, refreshCarts } = useCarts<ApiResponseProductBrandAndCategory[]>();
  const { profile, isLoading, refreshProfile } = useProfile<TMyProfile>();
  const cartsUser = carts.filter((cart) => cart.userId === profile?.data.id);
  useEffect(() => {
    if (profile && carts.length > 0) {
      refreshCarts();
      refreshProfile();
    }
  }, [profile, carts.length]);

  return cartsUser;
};

export default useGetCartsUser;
