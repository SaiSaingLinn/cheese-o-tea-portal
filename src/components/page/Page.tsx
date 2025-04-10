import { cn } from "@/components//ui/utils";
import { Button } from "@/components/ui/button";
import { useNavigate, useRouter } from "@tanstack/react-router";
// import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useTitle } from "react-use";

interface PageProps {
  title?: string;
  className?: string;
  children?: React.ReactNode;
  noSpace?: boolean;
  container?: boolean;
  table?: boolean;
}

export function Page({
  className,
  children,
  container,
  noSpace,
  title,
  table,
}: PageProps) {
  useTitle(title || "");

  return (
    <div
      className={cn(
        "flex-grow",
        table && "flex flex-col overflow-auto",
        !noSpace && "p-4",
        container && "container",
        className
      )}
    >
      {children}
    </div>
  );
}

interface PageHeaderProps {
  title?: string;
  extra?: React.ReactNode;
  children?: React.ReactNode;
  goBack?: boolean | string;
}

export function PageHeader({
  children,
  extra,
  title,
  goBack,
}: PageHeaderProps) {
  const navigate = useNavigate();
  const { history } = useRouter();

  const handleBack = () => {
    if (typeof goBack === "boolean") return history.go(-1);
    navigate({
      to: goBack,
    });
  };

  return (
    <div className="w-full flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        {goBack && (
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={handleBack}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        )}
        <h2 className="flex-1 shrink-0 whitespace-nowrap md:block text-xl font-bold tracking-tight sm:grow-0">
          {title}
        </h2>
        {extra}
      </div>
      <div className="flex items-center space-x-2">{children}</div>
    </div>
  );
}
