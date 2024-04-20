import { ApiResponseProductBrandAndCategory } from "@/services/type";
import { useCarts } from "../useCart";
import useToken from "../useToken";
import { useProfile } from "../useProfile";
import { TMyProfile } from "@/components/features/checkout/type";

const useGetCartsUser = () => {
  const tokenInfo = useToken();
  const { profile } = useProfile<TMyProfile>(tokenInfo ? false : true);

  const { carts, refreshCarts } = useCarts<ApiResponseProductBrandAndCategory[]>(
    {
      _expand: "userCarts",
      userCartsId: profile && profile.data.id,
    },
    profile ? false : true
  );
  return { carts, refreshCarts };
};

export default useGetCartsUser;
