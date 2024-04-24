import useSWR from "swr";
import { fetcherGet } from "@/services/callApiService";

export function useReviews<T>(query?: object, option?: { disable?: boolean }) {
  const url = "/reviews";

  const {
    data: reviews,
    isLoading,
    mutate,
  } = useSWR<T>(option?.disable ? null : [url, query], ([url, query]: [string, object?]) => fetcherGet(url, query), {
    revalidateIfStale: false,
  });

  const refreshReviews = () => {
    mutate(fetcherGet(url, query));
  };

  return {
    reviews,
    isLoading,
    refreshReviews,
  };
}
