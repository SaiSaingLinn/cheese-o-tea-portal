import { useUserStore } from "@/common/stores/userStore";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";

export default function HomeHeader() {
  const { user } = useUserStore();
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-center mb-1 bg-primary">
      <div className="flex items-center justify-center w-full relative py-4">
        <div className="absolute left-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => router.navigate({ to: "/" })}
          >
            <ArrowLeftIcon className="h-6 w-6 text-white" />
            <span className="sr-only">Back</span>
          </Button>
        </div>
        <h2 className="text-md font-semibold font-rubik text-white">Menu</h2>
        <div className="absolute right-4">
          {user ? (
            <Link
              to="/admin/category"
              className="text-sm font-semibold text-white hover:text-gray-200"
            >
              Admin
            </Link>
          ) : (
            <Link
              to="/sign-in"
              className="text-sm font-semibold text-white hover:text-gray-200"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
