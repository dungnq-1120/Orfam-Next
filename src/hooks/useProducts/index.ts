import { fetcherGet } from "@/services/callApiService";
import useSWR from "swr";

export function useProducts<T = any>(query?: object) {
  const url = "/products";

  const {
    data: products,
    isLoading,
    mutate,
  } = useSWR<T>([url, query], ([url, query]: [string, object?]) => fetcherGet(url, query), {
    revalidateIfStale: false,
  });

  const refreshProducts = () => {
    mutate();
  };

  return {
    products,
    isLoading,
    refreshProducts,
  };
}
