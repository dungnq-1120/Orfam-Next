import { create } from "zustand";

export interface Products {
  productCategoryId: number | null;
  productBrandId: number | null;
  searchValue: string;
  productRate: number | null;
  setSearchValue: (updatedProducts: string) => void;
  setProductCategoryId: (productCategoryId: number | null) => void;
  setProductBrandId: (productCategoryId: number | null) => void;
  setProductRate: (productRate: number | null) => void;
}

const useProductsStore = create<Products>((set) => ({
  searchValue: "",
  productCategoryId: null,
  productBrandId: null,
  productRate: null,
  setSearchValue: (updatedProducts) => set({ searchValue: updatedProducts }),
  setProductCategoryId: (productCategoryId) => set({ productCategoryId: productCategoryId }),
  setProductBrandId: (productBrandId) => set({ productBrandId: productBrandId }),
  setProductRate: (productRate) => set({ productRate: productRate }),
}));

export default useProductsStore;
