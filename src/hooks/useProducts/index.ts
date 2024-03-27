import { fetcherGet } from "@/services/callApiService";
import { ApiResponseProductCategory } from "@/services/typeApi";
import useSWR, { mutate } from "swr";

export function useProducts(query?: object) {
  const url = "/products";
  const { data: products, isLoading } = useSWR<ApiResponseProductCategory[]>(
    [url, query],
    ([url, query]: [string, object?]) => fetcherGet(url, query),
    {
      revalidateIfStale: false,
    }
  );

  const refreshProducts = () => {
    mutate(url);
  };
  
  return {
    products,
    isLoading,
    refreshProducts,
  };
}
