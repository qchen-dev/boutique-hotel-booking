import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import { QUERY_KEY } from "../../utils/contants";

export function useSettings() {
  const {
    isLoading,
    data: settings,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY.SETTINGS],
    queryFn: getSettings,
  });

  return { isLoading, error, settings };
}
