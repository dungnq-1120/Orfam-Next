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
    role: number;
    phone?: string;
    address?: string;
  };
}

export interface TOrder extends TFormBilling {
  id: number;
  userId: number;
  shipping: {
    type: string;
    price: number;
    label: string;
  };
  orderer: string;
  totalPrice: number;
  status: string;
  cartsOrder: ApiResponseProductBrandAndCategory[];
}
