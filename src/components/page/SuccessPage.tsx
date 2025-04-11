import svg from "@/assets/svg/success.svg";
import { cn } from "@/components/ui/utils";
import { Page } from "./Page";
import { buttonVariants } from "../ui/button";
import { Link } from "@tanstack/react-router";

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
          {title || "Your order is received."}
        </h3>
        <p className="text-sm text-muted-foreground text-wrap">
          {desctiption || "We will contact you shortly."}
        </p>
        <Link
          to="/"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
          )}
        >
          Back to Home
        </Link>
      </div>
    </Page>
  );
}
