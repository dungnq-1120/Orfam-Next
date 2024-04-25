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

export interface Product {
  title: string;
  quantity: number;
  status: string;
  price: number;
  image: string;
  rate: number;
  category: string;
  brand: string;
}

export interface ApiResponseProductCategory extends ApiResponseProduct {
  categories: {
    id: number;
    name: string;
  };
}

export interface ApiResponseProductBrandAndCategory extends ApiResponseProductCategory {
  userCartsId: number;
  userCarts: {
    name: string;
    id: number;
  };
  discount: {
    name: string;
    sale: number;
    code: string;
    id: 1;
  };
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

export enum ROLES {
  CUSTOMER = 0,
  ADMIN = 1,
}

export interface TMessage {
  userId: number;
  message: string;
  name: string;
  email: string;
  id: number;
}

export interface TComments {
  userCartsId: number;
  userCarts: {
    name: string;
    id: number;
  };
  id: number;
  comment: string;
  name: string;
}

export interface TDiscount {
  name: string;
  sale: number;
  code: string;
}

export interface TCodeDiscount extends TDiscount {
  id: number;
}

export interface TBrandAndCategories {
  id: number;
  name: string;
}
export interface TCartsUser extends TBrandAndCategories {}

export enum TRACKING {
  PLACED = "Placed",
  PACKED = "Packed",
  SHIPPING = "Shipping",
  DELIVERED = "Delivered",
}

export interface TReview {
  id: number;
  userCartsId: number;
  rate: number;
  review: string;
  productsId: number;
  userCarts: {
    name: string;
    id: number;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}
