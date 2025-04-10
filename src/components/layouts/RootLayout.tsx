import { ModalManager } from "@/components/common";
import { NotFoundPage } from "@/components/page";
import {
  ErrorComponent,
  Outlet,
  createRootRoute,
} from "@tanstack/react-router";

export function RootLayout() {
  return (
    <>
      <ModalManager />
      <Outlet />
    </>
  );
}

export const rootRoute = createRootRoute({
  component: () => <RootLayout />,
  notFoundComponent: () => <NotFoundPage isPage />,
  errorComponent: (error) => <ErrorComponent error={error} />,
});
