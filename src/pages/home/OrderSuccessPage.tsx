import { rootRoute } from "@/components/layouts";
import { SuccessPage } from "@/components/page/SuccessPage";
import { createRoute } from "@tanstack/react-router";

export function OrderSuccessPage() {
  return (
    <SuccessPage />
  );
}

export const orderSuccessRoute = createRoute({
  path: "/order-success",
  getParentRoute: () => rootRoute,
  component: () => {
    return <OrderSuccessPage />;
  },
});
