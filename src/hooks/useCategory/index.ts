import { fetcherGet } from "@/services/callApiService";
import useSWR from "swr";

interface PropsTab {
  id: number;
  name: string;
}

export function useCategories(query?: string) {
  const { data: categories } = useSWR<PropsTab[]>(`/categories${query ? `${query}` : ""}`, fetcherGet);

  return {
    categories,
  };
}
