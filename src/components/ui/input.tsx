import { cn } from "@/components/ui/utils";
import { cloneElement, forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, ...props }, ref) => {
    const left = leftIcon
      ? cloneElement(leftIcon, {
          className: cn(
            "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground",
            leftIcon?.props.onClick && "active:h-5"
          ),
        })
      : null;
    const right = rightIcon
      ? cloneElement(rightIcon, {
          className: cn(
            "absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground",
            rightIcon?.props.onClick && "active:h-5"
          ),
        })
      : null;
    return (
      <div className="relative">
        {left}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            left && "pl-8",
            right && "pr-8",
            className
          )}
          ref={ref}
          {...props}
        />
        {right}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
