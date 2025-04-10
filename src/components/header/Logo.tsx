import { cn } from "@/components/ui/utils";
import { Link, LinkProps } from "@tanstack/react-router";

interface LogoProps extends LinkProps {
  className?: string;
  mr?: boolean;
  noFilter?: boolean;
}
export function Logo({ className, mr = true, noFilter, ...props }: LogoProps) {

  return (
    <Link
      to="/"
      className={cn("flex items-center space-x-2", mr && "mr-6")}
      {...props}
    >
      <span className="hidden text-lg font-semibold sm:inline-block text-primary-foreground">
        Cheese O Tea
      </span>
    </Link>
  );
}
