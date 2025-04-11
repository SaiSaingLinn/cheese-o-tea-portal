import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { PanelLeft } from "lucide-react";
import { Profile } from "./Profile";
import { adminMenus } from "@/common/config/menus";
import { Separator } from "../ui/separator";
import { cn } from "../ui/utils";

interface MenuItemProps {
  menu: {
    to: string;
    label: string;
    icon: typeof PanelLeft;
  };
}

function SheetMenuItem({ menu }: MenuItemProps) {
  return (
    <SheetClose asChild>
      <Link
        to={menu.to}
        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
      >
        <menu.icon className="h-5 w-5" />
        {menu.label}
      </Link>
    </SheetClose>
  );
}

function Logo() {
  return (
    <SheetClose asChild>
      <Link
        to="/"
        className="group flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
      >
        <img src="/img/cheese-o-tea-logo.png" className="h-8" />
      </Link>
    </SheetClose>
  );
}

export function Header() {
  const matchRoute = useMatchRoute();
  return (
    <header className="sticky top-0 z-9 w-full flex items-center gap-4 px-4 py-2 border-b border-border/90 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Logo />
            {adminMenus.map((menu) => (
              <SheetMenuItem key={menu.to} menu={menu} />
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex-1 flex items-center">
        <Link to="/">
          <h1 className="text-xl font-bold text-primary inline-block">
            Logo
          </h1>
        </Link>
        <div className="hidden md:flex items-center mx-4">
          <Separator orientation="vertical" className="h-4" />
          <>
            {adminMenus?.map((menu: any, index: number) => {
              const active = matchRoute({ to: menu?.to });
              return (
                <Link
                  key={index}
                  to={menu?.to}
                  className={cn(
                    buttonVariants({
                      variant: `${active ? "secondary" : "ghost"}`,
                      size: "sm",
                    })
                  )}
                >
                  <span className="font-semibold">{menu?.label}</span>
                </Link>
              );
            })}
          </>
        </div>
      </div>
      <Profile />
    </header>
  );
}
