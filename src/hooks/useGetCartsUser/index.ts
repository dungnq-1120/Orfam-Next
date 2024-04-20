import { ApiResponseProductBrandAndCategory } from "@/services/type";
import { useCarts } from "../useCart";
import useToken from "../useToken";

const useGetCartsUser = () => {
  const tokenInfo = useToken();

  const { carts, refreshCarts } = useCarts<ApiResponseProductBrandAndCategory[]>(
    {
      _expand: "userCarts",
      userCartsId: tokenInfo && tokenInfo.id,
    },
    tokenInfo ? false : true
  );
  return { carts, refreshCarts };
};

export default useGetCartsUser;
