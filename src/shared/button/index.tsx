import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-white hover:brightness-110 duration-500 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      types: {
        primary: "bg-blue-ct7",
        error: "bg-red-500",
        success: "bg-green-ct5",
        secondary: "bg-secondary",
        warning: "bg-yellow-500",
      },
      size: {
        default: "px-4 py-2",
        sm: "px-2 py-2",
        md: "px-5 py-5",
        full: "w-full",
      },
    },
    defaultVariants: {
      types: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, types, size, asChild = false, ...props }, ref) => {
  const classStyles = buttonVariants({
    className,
    types,
    size,
  });
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(classStyles, className)} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
