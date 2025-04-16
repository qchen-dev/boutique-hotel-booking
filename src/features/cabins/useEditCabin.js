import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import { QUERY_KEY } from "../../utils/contants";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => {
      return createEditCabin(newCabinData, id);
    },

    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CABINS] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
