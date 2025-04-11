import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "../services/auth";
import { toast } from "sonner";
import { useUserStore } from "../stores/userStore";
import { useNavigate } from "@tanstack/react-router";

export function useAdminLogin() {
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: Login) => adminLogin(data),
    onSuccess: ({ data }) => {
      toast.success("Login successfully");
      const { name } = data.data;
      setUser({ name });
      navigate({
        to: "/admin/category",
      });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Invalid credential");
    },
  });
}