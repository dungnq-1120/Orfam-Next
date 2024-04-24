import useSWR from "swr";
import { fetcherGet } from "@/services/callApiService";

export function useCarts<T>(query?: object, option?: { disable?: boolean }) {
  const url = "/carts";

  const {
    data: carts,
    isLoading,
    mutate,
  } = useSWR<T>(option?.disable ? null : [url, query], ([url, query]: [string, object?]) => fetcherGet(url, query), {
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
