import { useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import qs from "qs";
// import { toast } from "sonner";
import { menuItmeKeys } from "../config/query-keys";
import { getMenuItems } from "../services/menuItem";

export function useGetMenuItems() {
  const search = useSearch({ from: "/" });
  const query = qs.stringify(search);
  return useQuery({
    queryKey: menuItmeKeys.list(query),
    queryFn: () => getMenuItems(query),
    select: (data) => data?.data,
    placeholderData: (previousData) => previousData,
  });
}