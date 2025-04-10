import svg from "@/assets/svg/success.svg";
import { cn } from "@/components/ui/utils";
import { Page } from "./Page";

export function SuccessPage({
  className,
  border,
  title,
  desctiption,
}: {
  title?: string;
  desctiption?: string;
  className?: string;
  border?: boolean;
}) {
  return (
    <Page>
      <div
        className={cn(
          "w-full min-h-[400px] py-20 flex-grow flex-1 flex flex-col space-y-4 items-center justify-center rounded-lg",
          border && "border border-dashed shadow-sm",
          className
        )}
      >
        <img src={svg} width={100} />
        <h3 className="text-2xl font-bold tracking-tight">
          {title || "Access Denied"}
        </h3>
        <p className="text-sm text-muted-foreground text-wrap">
          {desctiption || "You don't have permission to access this page"}
        </p>
      </div>
    </Page>
  );
}
