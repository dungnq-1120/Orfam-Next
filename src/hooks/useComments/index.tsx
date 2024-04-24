import useSWR from "swr";
import { fetcherGet } from "@/services/callApiService";

export function useComments<T>(query?: object) {
  const url = "/comments";

  const {
    data: comments,
    isLoading,
    mutate,
  } = useSWR<T>([url, query], ([url, query]: [string, object?]) => fetcherGet(url, query), {
    revalidateIfStale: false,
  });

  const refreshComments = () => {
    mutate(fetcherGet(url, query));
  };

  return {
    comments,
    isLoading,
    refreshComments,
  };
}
