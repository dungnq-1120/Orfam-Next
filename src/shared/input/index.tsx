import { cva } from "class-variance-authority";
import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface PropsInput extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  types?: "primary" | "secondary" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const variantsStylesInput = cva(["border-2 border-gray-400 text-base pl-4 outline-none rounded-md "], {
  variants: {
    types: {
      primary: "focus:border-blue-500 focus:border-2",
      secondary: "focus:border-gray-500 focus:border-2",
      success: "focus:border-green-ct5 focus:border-2",
      warning: "focus:border-yellow-500 focus:border-2",
      error: "focus:border-red-500 focus:border-2",
    },
    size: {
      sm: "py-3",
      md: "py-4",
      lg: "py-5",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    types: "primary",
    size: "sm",
  },
});

const Input = forwardRef<HTMLInputElement, PropsInput>(({ className, types = "primary", size = "sm", fullWidth, ...rest }, ref) => {
  const classStyles = variantsStylesInput({
    className,
    types,
    size,
    fullWidth,
  });

  const mergedClassName = cn(classStyles, className);

  return <input {...rest} ref={ref} className={mergedClassName} />;
});
Input.displayName = "Input";

export default Input;
