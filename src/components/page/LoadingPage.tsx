import { cn } from "@/components/ui/utils";
import { PuffLoader } from "react-spinners";
import { Page } from "./Page";

export function LoadingPage({
  className,
  border,
}: {
  className?: string;
  border?: boolean;
}) {
  return (
    <Page>
      <div
        className={cn(
          "w-full min-h-[500px] py-20 flex-grow flex flex-1 items-center justify-center rounded-lg",
          border && "border border-dashed shadow-sm",
          className
        )}
      >
        <PuffLoader color={"#000"} />
      </div>
    </Page>
  );
}
