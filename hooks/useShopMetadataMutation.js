import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosAuth from "@utils/axiosAuth";

const useShopMetadataMutation = () => {
  const axios = axiosAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewModalStatus) =>
      axios.patch("/api/shop_metadata", reviewModalStatus),
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["shop_metadata"]);
    },
  });
};

export default useShopMetadataMutation;
