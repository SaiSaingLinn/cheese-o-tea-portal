import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
import { categoryKeys } from "../config/query-keys";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../services/category";
import { toast } from "sonner";

export function useGetCategories() {
  return useQuery({
    queryKey: categoryKeys.list(""),
    queryFn: () => getCategories(),
    select: (data) => data?.data,
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: true,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Category) => createCategory(data),
    onSuccess: () => {
      toast.success("Category has been created");
      queryClient.invalidateQueries({
        queryKey: categoryKeys.lists(),
      });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create category");
    },
  });
}

export function useUpdateCategory(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Category) => updateCategory(id, data),
    onSuccess: () => {
      toast.success("Category has been updated");
      queryClient.invalidateQueries({
        queryKey: categoryKeys.lists(),
      });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update category");
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      toast.success("Category has been deleted");
      queryClient.invalidateQueries({
        queryKey: categoryKeys.lists(),
      });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to delete category");
    },
  });
}