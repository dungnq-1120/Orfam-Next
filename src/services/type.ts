import { TFormBilling, TUser } from "@/components/features/checkout/type";
import { TFormRegister } from "@/shared/form/type";

export interface ApiResponseProduct {
  id: number;
  title: string;
  quantity: number;
  categoriesId: number;
  status: string;
  price: number;
  description: string;
  image: string;
  brandsId: number;
  rate: number;
}

export interface ApiResponseProductCategory extends ApiResponseProduct {
  categories: {
    id: number;
    name: string;
  };
}

export interface ApiResponseProductBrandAndCategory extends ApiResponseProductCategory {
  brands: {
    id: number;
    name: string;
  };
}

export interface ProductData {
  data: ApiResponseProduct[];
  pagination: {
    _limit: number;
    _page: number;
    _totalRows: number;
  };
}

export interface ProductDataCategory extends ProductData {
  data: ApiResponseProductCategory[];
}

export interface TProfile {
  userId?: number;
  name: string;
  phone?: string;
  email: string;
  address?: string;
  password?: string;
  confirmPassword?: string;
}
