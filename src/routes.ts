import {
  adminRoute,
  rootRoute,
} from "@/components/layouts";
import { homeRoute, orderSuccessRoute } from "@/pages/home";
import { createRouter } from "@tanstack/react-router";
import { categoryRoute } from "./pages/admin/category";
import { menuRoute } from "./pages/admin/menu";
import { orderRoute } from "./pages/admin/order";
import { signInRoute } from "./pages/auth";

const routeTree = rootRoute.addChildren([
  homeRoute,
  orderSuccessRoute,
  signInRoute,
  adminRoute.addChildren([
    categoryRoute,
    menuRoute,
    orderRoute,
  ]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
