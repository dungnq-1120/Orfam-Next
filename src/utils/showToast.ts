import { Bounce, toast } from "react-toastify";

interface Props {
  type: "info" | "success" | "warning" | "error";
  message: string;
}

const showToast = ({ message, type }: Props) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export default showToast;
