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
export interface TUserInfo extends TToken {
  address: string;
  phone: string;
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
  shipping: {
    type: string;
    price: number;
    label: string;
  };
  orderer: string;
  discount: {
    name: string;
    sale: number;
    code: string;
    id: 1;
  };
  totalPrice: number;
  status: string;
  carts: ApiResponseProductBrandAndCategory[];
}
