import { fetcherGet } from "@/services/callApiService";
import { ApiResponseProductCategory } from "@/services/typeApi";
import useSWR from "swr";

export function useProducts(query?: string) {
  const { data: products } = useSWR<ApiResponseProductCategory[]>(`/products${query ? `${query}` : ""}`, fetcherGet, {
    revalidateIfStale: false,
  });

  return {
    products,
  };
}
