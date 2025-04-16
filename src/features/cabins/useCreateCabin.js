import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import { QUERY_KEY } from "../../utils/contants";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,

    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CABINS] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}
