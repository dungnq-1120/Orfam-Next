import React, { forwardRef, useEffect } from "react";
import useToastStore from "@/store/useToast";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  type?: "info" | "success" | "warning" | "error";
  message: string;
  position?: "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center";
  theme?: "light" | "dark" | "colored";
  isOpen: boolean;
}

const Toast = forwardRef<HTMLDivElement, Props>(
  ({ className, isOpen, type = "success", message, position = "top-right", theme = "colored", ...rest }, ref) => {
    const { setIsOpen } = useToastStore((state) => ({
      setIsOpen: state.setIsOpen,
    }));

    useEffect(() => {
      if (isOpen) {
        showToast();
      }
      setIsOpen(false);
    }, [isOpen]);

    const showToast = () => {
      toast[type](message, {
        position: position,
        autoClose: 5000,
        hideProgressBar: !isOpen,
        closeOnClick: isOpen,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: theme,
        transition: Bounce,
      });
    };

    return (
      <div ref={ref}>
        <ToastContainer />
      </div>
    );
  }
);

Toast.displayName = "Toast";

export default Toast;
