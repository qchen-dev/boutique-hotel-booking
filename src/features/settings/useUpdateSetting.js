import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import { QUERY_KEY } from "../../utils/contants";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newSetting }) => {
      return updateSettingApi(newSetting);
    },

    onSuccess: () => {
      toast.success("Settings successfully updated");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SETTINGS] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSetting };
}
