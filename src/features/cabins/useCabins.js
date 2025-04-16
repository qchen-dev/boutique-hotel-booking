import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { QUERY_KEY } from "../../utils/contants";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY.CABINS],
    queryFn: getCabins,
  });

  return { isLoading, error, cabins };
}
