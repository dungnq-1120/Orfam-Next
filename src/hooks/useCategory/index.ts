import { fetcherGet } from "@/services/callApiService";
import useSWR from "swr";

interface PropsTab {
  id: number;
  typeProduct: string;
}

export function useCategories() {
  const { data: categories } = useSWR<PropsTab[]>("/categories", fetcherGet);

  return {
    categories,
  };
}
