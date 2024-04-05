import useSWR, { mutate } from "swr";
import { fetcherGet } from "@/services/callApiService";

interface PropsTab {
  id: number;
  name: string;
}

export function useCategories(query?: object) {
  const url = "/categories";
  const { data: categories, isLoading } = useSWR<PropsTab[]>([url, query], ([url, query]: [string, object?]) => fetcherGet(url, query), {
    revalidateIfStale: false,
  });

  const refreshCategories = () => {
    mutate(url);
  };

  return {
    categories,
    isLoading,
    refreshCategories,
  };
}
