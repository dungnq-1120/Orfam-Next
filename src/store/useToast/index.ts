import { create } from "zustand";

export interface Props {
  isOpen: boolean;
  message: string;
  type: "info" | "success" | "warning" | "error";
  setIsOpen: (isOpen: boolean) => void;
  setMessage: (message: string) => void;
  setType: (type: "info" | "success" | "warning" | "error") => void;
}

const useToastStore = create<Props>((set) => ({
  isOpen: false,
  message: "",
  type: "success",
  setIsOpen: (isOpen) => set({ isOpen: isOpen }),
  setType: (type) => set({ type: type }),
  setMessage: (message) => set({ message: message }),
}));

export default useToastStore;
