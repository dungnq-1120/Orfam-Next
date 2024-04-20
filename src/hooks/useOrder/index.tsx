import useSWR from "swr";
import { fetcherGet } from "@/services/callApiService";

export function useOrders<T>(query?: object, disabled?: boolean) {
  const url = "/orders";
  const {
    data: orders,
    isLoading,
    mutate,
  } = useSWR<T>(disabled ? null : [url, query], ([url, query]: [string, object?]) => fetcherGet(url, query), {
    revalidateIfStale: false,
  });

  const refreshOrders = () => {
    mutate(fetcherGet(url, query));
  };

  return {
    orders: orders || [],
    isLoading,
    refreshOrders,
  };
}
