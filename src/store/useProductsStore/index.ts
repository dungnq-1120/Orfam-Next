import { create } from "zustand";

export interface Products {
  productCategoryId: number | null;
  productBrandId: number | null;
  searchValue: string;
  productRate: number | null;
  saveSearchValue: (updatedProducts: string) => void;
  saveProductCategoryId: (productCategoryId: number | null) => void;
  saveProductBrandId: (productCategoryId: number | null) => void;
  saveProductRate: (productRate: number | null) => void;
}

const useProductsStore = create<Products>((set) => ({
  searchValue: "",
  productCategoryId: null,
  productBrandId: null,
  productRate: null,
  saveSearchValue: (updatedProducts) => set({ searchValue: updatedProducts }),
  saveProductCategoryId: (productCategoryId) => set({ productCategoryId: productCategoryId }),
  saveProductBrandId: (productBrandId) => set({ productBrandId: productBrandId }),
  saveProductRate: (productRate) => set({ productRate: productRate }),
}));

export default useProductsStore;
