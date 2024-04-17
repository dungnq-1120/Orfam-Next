import useSWR, { mutate } from "swr";
import { fetcherGet } from "@/services/callApiService";

interface Props {
  id: number;
  name: string;
}

export function useBrands(query?: object) {
  const url = "/brands";
  const { data: brands, isLoading } = useSWR<Props[]>([url, query], ([url, query]: [string, object?]) => fetcherGet(url, query), {
    revalidateIfStale: false,
  });

  const refreshBrand = () => {
    mutate(url);
  };

  return {
    brands,
    isLoading,
    refreshBrand,
  };
}
