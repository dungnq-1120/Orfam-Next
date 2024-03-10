import { cva } from "class-variance-authority";
import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface PropsInput extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  types?: "primary" | "error";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const variantsStylesInput = cva(
  [
    "peer h-4 w-4 inline-block shrink-0 rounded-x disabled:cursor-not-allowed disabled:opacity-100",
  ],
  {
    variants: {
      types: {
        primary: "focus:shadow-shadowCheck outline-red-500 focus:outline-none",
        error: "focus:shadow-shadowRed outline-red-500 focus:outline-none",
      },
      size: {
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8",
      },
    },
    defaultVariants: {
      types: "primary",
      size: "sm",
    },
  }
);

const Checkbox = forwardRef<HTMLInputElement, PropsInput>(({ className, types = "primary", size = "sm", fullWidth, ...rest }, ref) => {
  const classStyles = variantsStylesInput({
    className,
    types,
    size,
  });

  return <input type="checkbox" {...rest} ref={ref} className={cn(classStyles, className)} />;
});
Checkbox.displayName = "Checkbox";

export default Checkbox;
