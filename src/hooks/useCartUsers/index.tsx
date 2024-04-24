import useSWR from "swr";
import { fetcherGet } from "@/services/callApiService";

export function useCartsUser<T>(query?: object) {
  const url = "/userCarts";

  const {
    data: userCarts,
    isLoading,
    mutate,
  } = useSWR<T>([url, query], ([url, query]: [string, object?]) => fetcherGet(url, query), {
    revalidateIfStale: false,
  });

  const refreshCartsUser = () => {
    mutate();
  };

  return {
    userCarts,
    isLoading,
    refreshCartsUser,
  };
}
