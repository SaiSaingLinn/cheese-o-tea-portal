import {
  HomeIcon,
  MenuIcon,
  ShoppingBagIcon,
  TagIcon,
} from "lucide-react";

export const adminMenus = [
  {
    to: "/",
    label: "Home",
    icon: HomeIcon,
  },
  {
    to: "/admin/category",
    label: "Category",
    icon: TagIcon,
  },
  {
    to: "/admin/menu",
    label: "Menu",
    icon: MenuIcon,
  },
  {
    to: "/admin/order",
    label: "Order",
    icon: ShoppingBagIcon,
  },
];
