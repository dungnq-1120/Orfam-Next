import useSWR from "swr";
import { fetcherGet } from "@/services/callApiService";

export function useProfile<T>() {
  const url = `/profile`;
  const {
    data: profile,
    isLoading,
    mutate,
  } = useSWR<T>([url], ([url]: [string]) => fetcherGet(url), {
    revalidateIfStale: false,
  });

  const refreshProfile = () => {
    mutate(fetcherGet(url));
  };

  return {
    profile,
    isLoading,
    refreshProfile,
  };
}
