import {
  adminRoute,
  rootRoute,
} from "@/components/layouts";
import { homeRoute, orderSuccessRoute, signInRoute } from "@/pages/home";
import { createRouter } from "@tanstack/react-router";
import { categoryRoute } from "./pages/category";

const routeTree = rootRoute.addChildren([
  homeRoute,
  orderSuccessRoute,
  signInRoute,
  adminRoute.addChildren([
    categoryRoute
  ]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
