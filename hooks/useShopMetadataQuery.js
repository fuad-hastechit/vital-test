import { useQuery } from "@tanstack/react-query";

import axiosAuth from "@utils/axiosAuth";

const useShopMetadataQuery = () => {
  const axios = axiosAuth();
  return useQuery({
    queryKey: ["shop_metadata"],
    queryFn: async () => {
      const { data } = await axios.get("/api/shop_metadata");
      return data;
    },
  });
};

export default useShopMetadataQuery;
