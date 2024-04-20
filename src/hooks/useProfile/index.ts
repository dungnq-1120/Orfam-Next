import useSWR from "swr";
import { fetcherGet } from "@/services/callApiService";

export function useProfile<T>(disabled?: boolean) {
  const url = "/auth/my-profile";
  const {
    data: profile,
    isLoading,
    mutate,
  } = useSWR<T>(disabled ? null : [url], ([url]: [string]) => fetcherGet(url), {
    revalidateIfStale: true,
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
