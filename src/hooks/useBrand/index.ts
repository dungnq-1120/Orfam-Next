import { fetcherGet } from "@/services/callApiService";
import useSWR, { mutate } from "swr";

interface Props {
  id: number;
  name: string;
}

export function useBrands(query?: object) {
  const url = "/brands";
  const { data: brands, isLoading } = useSWR<Props[]>([url, query], ([url, query]: [string, object?]) => fetcherGet(url, query), {
    revalidateIfStale: false,
  });

  const refreshRate = () => {
    mutate(url);
  };

  return {
    brands,
    isLoading,
    refreshRate,
  };
}
