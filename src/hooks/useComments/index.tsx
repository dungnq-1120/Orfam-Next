import useSWR from "swr";
import { fetcherGet } from "@/services/callApiService";

export function useComments<T>() {
  const url = "/comments";
  
  const {
    data: comments,
    isLoading,
    mutate,
  } = useSWR<T>([url], ([url]: [string]) => fetcherGet(url), {
    revalidateIfStale: false,
  });

  const refreshComments = () => {
    mutate(fetcherGet(url));
  };

  return {
    comments,
    isLoading,
    refreshComments,
  };
}
