import { Button, ButtonProps } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

interface AddButtonProps extends ButtonProps {
  to?: string;
}

export function AddButton({ to, onClick, ...props }: AddButtonProps) {
  const Btn = () => (
    <Button
      size="sm"
      className="h-8 gap-1"
      {...props}
      onClick={to ? undefined : onClick}
    >
      <PlusIcon className="h-5 w-5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        Add New
      </span>
    </Button>
  );
  if (!to) return <Btn />;
  return (
    <Link to={to}>
      <Btn />
    </Link>
  );
}
