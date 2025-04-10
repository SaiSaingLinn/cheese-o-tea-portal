import { adminRoute } from "@/components/layouts";
import { createRoute } from "@tanstack/react-router";

function CategoryIndexPage() {
  return (
    <div className="max-w-md mx-auto h-screen overflow-hidden bg-white">
      Category Page
    </div>
  );
}

export const categoryRoute = createRoute({
  path: "/category",
  getParentRoute: () => adminRoute,
  component: () => <CategoryIndexPage />,
});
