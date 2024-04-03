import { fetcherDelete, fetcherGet } from "@/services/callApiService";
import useSWR from "swr";

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
    carts,
    isLoading,
    refreshCarts,
  };
}