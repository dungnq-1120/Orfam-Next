import useSWR from "swr";
import { fetcherGet } from "@/services/callApiService";

export function useCarts<T>(query?: object) {
  const url = `/carts`;
  const {
    data: carts,
    isLoading,
    mutate,
  } = useSWR<T>([url, query], ([url, query]: [string, object?]) => fetcherGet(url, query), {
    revalidateIfStale: false,
  });

  const refreshCarts = () => {
    mutate(fetcherGet(url, query));
  };

  return {
    carts: carts || [],
    isLoading,
    refreshCarts,
  };
}

