import useSWR, { mutate } from "swr";
import { fetcherGet } from "@/services/callApiService";

interface Props {
  id: number;
  name: string;
}

export function useBrands() {
  const url = "/brands";
  const {
    data: brands,
    isLoading,
    mutate,
  } = useSWR<Props[]>([url], ([url]: [string]) => fetcherGet(url), {
    revalidateIfStale: false,
  });

  const refreshBrand = () => {
    mutate(fetcherGet(url));
  };

  return {
    brands,
    isLoading,
    refreshBrand,
  };
}
