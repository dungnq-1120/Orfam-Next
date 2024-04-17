import { useProfile } from "../useProfile";
import { useCarts } from "../useCart";

import type { TMyProfile } from "@/components/features/checkout/type";

import { ApiResponseProductBrandAndCategory } from "@/services/type";

const useGetCartsUser = () => {
  const { carts } = useCarts<ApiResponseProductBrandAndCategory[]>();
  const { profile } = useProfile<TMyProfile>();
  const cartsUser = carts.filter((cart) => cart.userId === profile?.data.id);
  const cartsUserProducts = cartsUser.filter((cart) => cart.userId === profile?.data.id);
  return cartsUserProducts;
};

export default useGetCartsUser;
