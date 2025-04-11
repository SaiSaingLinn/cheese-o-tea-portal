import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createOrder, getOrders } from "../services/order";
import { toast } from "sonner";
import { orderKeys } from "../config/query-keys";
import { useNavigate } from "@tanstack/react-router";

export function useGetOrders() {
  return useQuery({
    queryKey: orderKeys.list(""),
    queryFn: () => getOrders(),
    select: (data) => data?.data,
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: true,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: Order) => createOrder(data),
    onSuccess: () => {
      toast.success("Order has been placed successfully");
      navigate({
        to: "/order-success",
      });
      queryClient.invalidateQueries({
        queryKey: orderKeys.lists(),
      });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create order");
    },
  });
}