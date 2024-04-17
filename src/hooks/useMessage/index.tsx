import useSWR from "swr";
import { fetcherGet } from "@/services/callApiService";

export function useMessage<T>() {
  const url = "/message";
  
  const {
    data: messages,
    isLoading,
    mutate,
  } = useSWR<T>([url], ([url]: [string]) => fetcherGet(url), {
    revalidateIfStale: false,
  });

  const refreshMessage = () => {
    mutate(fetcherGet(url));
  };

  return {
    messages,
    isLoading,
    refreshMessage,
  };
}
