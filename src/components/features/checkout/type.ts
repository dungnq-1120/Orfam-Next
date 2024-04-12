import { ApiResponseProductBrandAndCategory } from "@/services/type";

export interface TOptionShip {
  type: string;
  price: number;
  label: string;
}

export interface TFormBilling {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface TUser {
  id: number;
  name: string;
  email: string;
}

export interface TMyProfile {
  status: number;
  data: {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };
}

export interface TOrder extends TFormBilling {
  id: number;
  shipping: object;
  userId: number;
  carts: ApiResponseProductBrandAndCategory[];
}
