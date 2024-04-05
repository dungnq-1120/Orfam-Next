import useSWR from "swr";
import { fetcherGet } from "@/services/callApiService";

export function useProducts<T>(query?: object) {
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
