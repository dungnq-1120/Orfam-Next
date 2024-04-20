import useSWR from "swr";
import { fetcherGet } from "@/services/callApiService";

export function useDiscounts<T>(query?: object, disabled?: boolean) {
  const url = "/discountCodes";

  const {
    data: discount,
    isLoading,
    mutate,
  } = useSWR<T>(disabled ? null : [url, query], ([url, query]: [string, object?]) => fetcherGet(url, query), {
    revalidateIfStale: false,
  });

  const refreshDiscounts = () => {
    mutate();
  };

  return {
    discount,
    isLoading,
    refreshDiscounts,
  };
}
