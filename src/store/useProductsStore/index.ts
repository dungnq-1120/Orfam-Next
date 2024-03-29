import { create } from "zustand";

export interface Products {
  productsSearch: string;
  saveProducts: (updatedProducts: string) => void;
}

const useProductsStore = create<Products>((set) => ({
  productsSearch: "",
  saveProducts: (updatedProducts: string) => set({ productsSearch: updatedProducts }),
}));

export default useProductsStore;
