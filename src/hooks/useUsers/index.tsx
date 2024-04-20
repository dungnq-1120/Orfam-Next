import useSWR from "swr";
import { fetcherGet } from "@/services/callApiService";

export function useUsers<T>() {
  const url = "/auth/users";
  const {
    data: users,
    isLoading,
    mutate,
  } = useSWR<T>([url], ([url]: [string]) => fetcherGet(url), {
    revalidateIfStale: true,
  });

  const refreshUsers = () => {
    mutate(fetcherGet(url));
  };

  return {
    users,
    isLoading,
    refreshUsers,
  };
}
