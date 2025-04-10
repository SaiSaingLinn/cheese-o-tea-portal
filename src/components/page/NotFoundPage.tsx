import svg from "@/assets/svg/not-found.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";
import { useRouter } from "@tanstack/react-router";
import { Page } from "./Page";

export function NotFoundPage({
  className,
  isPage,
}: {
  className?: string;
  isPage?: boolean;
}) {
  const { history } = useRouter();

  const notfound = (
    <div
      className={cn(
        "w-full min-h-[500px] py-20 flex-grow flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm",
        className
      )}
    >
      <div className="flex flex-col items-center gap-1 text-center px-4">
        <img src={svg} width={200} />
        <h3 className="text-2xl font-bold tracking-tight">Page Not Found</h3>
        <p className="text-sm text-muted-foreground text-wrap">
          The link you followed broken or the page have been removed
        </p>
        <Button className="mt-4" onClick={() => history.go(-1)}>
          Go Back
        </Button>
      </div>
    </div>
  );

  if (!isPage) return notfound;
  return <Page>{notfound}</Page>;
}
