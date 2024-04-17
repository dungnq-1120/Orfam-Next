import useSWR from "swr";
import { fetcherGet } from "@/services/callApiService";

export function useDiscounts<T>() {
  const url = "/discountCodes";
  
  const {
    data: discounts,
    isLoading,
    mutate,
  } = useSWR<T>([url], ([url]: [string]) => fetcherGet(url), {
    revalidateIfStale: false,
  });

  const refreshDiscounts = () => {
    mutate(fetcherGet(url));
  };

  return {
    discounts,
    isLoading,
    refreshDiscounts,
  };
}
