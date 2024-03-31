import React, { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

interface Props extends HTMLAttributes<HTMLDivElement> {
  containerClassName?: string;
  types?: "white" | "primary" | "secondary" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

const defaultClassLoading = cva("animate-spin border-4 border-t-transparent rounded-full ", {
  variants: {
    types: {
      white: "border-white border-t-transparent",
      primary: "border-blue-ct7 border-t-transparent",
      error: "border-red-500 border-t-transparent",
      success: "border-green-ct5 border-t-transparent",
      secondary: "border-secondary border-t-transparent",
      warning: "border-yellow-500 border-t-transparent",
    },
    size: {
      sm: "w-6 h-6",
      md: "w-12 p-12",
      lg: "w-30 h-30",
    },
  },
  defaultVariants: {
    types: "white",
    size: "sm",
  },
});

const Loading = forwardRef<HTMLDivElement, Props>(({ className, containerClassName, types, size, fullScreen, ...props }, ref) => {
  const defaultClass = defaultClassLoading({
    className,
    types,
    size,
  });
  const fullScreenOverlayClass = fullScreen ? "fixed w-screen h-screen bg-white z-6xl" : "relative";
  return (
    <div className={cn("flex justify-center items-center", fullScreenOverlayClass, containerClassName)}>
      <div {...props} ref={ref} className={cn(defaultClass, className)}></div>
    </div>
  );
});

Loading.displayName = "Loading";

export default Loading;
