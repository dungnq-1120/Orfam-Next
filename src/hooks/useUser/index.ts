import useSWR from "swr";
import { fetcherGet } from "@/services/callApiService";

export function useUser<T>() {
  const url = `/auth/users`;
  const {
    data: user,
    isLoading,
    mutate,
  } = useSWR<T>([url], ([url]: [string]) => fetcherGet(url), {
    revalidateIfStale: false,
  });

  const refreshUser = () => {
    mutate(fetcherGet(url));
  };

  return {
    user,
    isLoading,
    refreshUser,
  };
}
