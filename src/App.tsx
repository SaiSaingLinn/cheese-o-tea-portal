import { useInit } from "@/common/hooks/useInit";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
});

export default function App() {
  const ready = useInit();

  if (!ready) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
      <Toaster
        closeButton={true}
        toastOptions={{
          className: "bg-white text-black border-gray-100 rounded-lg shadow-lg",
          classNames: {
            closeButton: "right-0 left-auto border-1 border-gray-300",
          },
        }}
      />
    </QueryClientProvider>
  );
}
