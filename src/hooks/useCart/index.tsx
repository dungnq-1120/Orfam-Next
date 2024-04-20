import useSWR from "swr";
import { fetcherGet } from "@/services/callApiService";

export function useCarts<T>(query?: object, disabled?: boolean) {
  const url = "/carts";

  const {
    data: carts,
    isLoading,
    mutate,
  } = useSWR<T>(disabled ? null : [url, query], ([url, query]: [string, object?]) => fetcherGet(url, query), {
    revalidateIfStale: true,
  });

  const refreshCarts = () => {
    mutate();
  };

  return {
    carts: carts || [],
    isLoading,
    refreshCarts,
  };
}
