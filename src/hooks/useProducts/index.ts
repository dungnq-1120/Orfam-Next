import { fetcherGet } from "@/services/callApiService";
import { ApiResponseProductCategory } from "@/services/typeApi";
import useSWR from "swr";

export function useProducts(query?: object) {
  const url = "/products";
  const { data: products } = useSWR<ApiResponseProductCategory[]>([url, query], ([url, query]: [string, object?]) => fetcherGet(url, query), {
    revalidateIfStale: false,
  });

  return {
    products,
  };
}
