import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { menuKeys } from "../config/query-keys";
import { toast } from "sonner";
import { createMenu, deleteMenu, getMenus, updateMenu } from "../services/menu";

export function useGetMenus() {
  return useQuery({
    queryKey: menuKeys.list(""),
    queryFn: () => getMenus(),
    select: (data) => data?.data,
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: true,
  });
}

export function useCreateMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Menu) => createMenu(data),
    onSuccess: () => {
      toast.success("Menu has been created");
      queryClient.invalidateQueries({
        queryKey: menuKeys.lists(),
      });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create menu");
    },
  });
}

export function useUpdateMenu(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Menu) => updateMenu(id, data),
    onSuccess: () => {
      toast.success("Menu has been updated");
      queryClient.invalidateQueries({
        queryKey: menuKeys.lists(),
      });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update menu");
    },
  });
}

export function useDeleteMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteMenu(id),
    onSuccess: () => {
      toast.success("Menu has been deleted");
      queryClient.invalidateQueries({
        queryKey: menuKeys.lists(),
      });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to delete menu");
    },
  });
}