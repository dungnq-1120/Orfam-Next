import { fetcherGet } from "@/services/callApiService";
import { ApiResponseProductCategory } from "@/services/typeApi";
import useSWR from "swr";

export function useProducts() {
  const { data: products } = useSWR<ApiResponseProductCategory[]>("/products?_expand=categories", fetcherGet);

  return {
    products,
  };
}
