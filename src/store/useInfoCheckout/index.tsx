import { TCodeDiscount } from "@/services/type";
import { create } from "zustand";

export interface Props {
  discount?: TCodeDiscount[]
  total: number;
  setDiscount: (discount: TCodeDiscount[]) => void;
  setTotal: (total: number) => void;
}

const useInfoCheckout = create<Props>((set) => ({
  discount: [],
  total: 0,
  setDiscount: (discount) => set({ discount }),
  setTotal: (total) => set({ total }),
}));

export default useInfoCheckout;
