import { adminMenus } from "@/common/config/menus";
import { Header } from "@/components/header";
import { NotFoundPage } from "@/components/page";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/components/ui/utils";
import {
  ErrorComponent,
  Link,
  Outlet,
  createRoute,
  useMatchRoute,
} from "@tanstack/react-router";
import { PanelLeft } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { rootRoute } from "./RootLayout";

interface MenuItemProps {
  menu: {
    to: string;
    label: string;
    icon: typeof PanelLeft;
  };
}

function MenuItem({ menu }: MenuItemProps) {
  const matchRoute = useMatchRoute();
  const active = matchRoute({ to: menu?.to });
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to={menu.to}
          className={cn(
            buttonVariants({
              variant: active ? "default" : "ghost",
              size: "icon",
            })
          )}
        >
          <menu.icon className="h-4 w-4" />
          <span className="sr-only">{menu.label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={5}>
        {menu.label}
      </TooltipContent>
    </Tooltip>
  );
}

export function AdminLayout() {
  return (
    <div className="flex flex-col bg-muted/40 max-h-screen">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center py-2">
          <Link to="/">
            <img
              alt={"cheese-o-tea-logo"}
              src="/img/cheese-o-tea-logo.png"
              className={cn(
                "h-5",
                buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })
              )}
            />
          </Link>
        </nav>
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {adminMenus.map((menu: any) => (
            <MenuItem key={menu.to} menu={menu} />
          ))}
        </nav>
      </aside>
      <div className="flex-grow max-w-full min-h-screen flex flex-col sm:pl-14 overflow-hidden">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export const adminRoute = createRoute({
  path: "admin",
  getParentRoute: () => rootRoute,
  component: () => <AdminLayout />,
  notFoundComponent: () => <NotFoundPage isPage />,
  errorComponent: (error) => <ErrorComponent error={error} />,
});
