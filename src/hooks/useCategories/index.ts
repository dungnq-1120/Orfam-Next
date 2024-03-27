import { fetcherGet } from "@/services/callApiService";
import useSWR from "swr";

interface PropsTab {
  id: number;
  name: string;
}

export function useCategories(query?: object) {
  const url = "/categories";
  const { data: categories } = useSWR<PropsTab[]>([url, query], ([url, query]: [string, object?]) => fetcherGet(url, query), {
    revalidateIfStale: false,
  });

  return {
    categories,
  };
}
