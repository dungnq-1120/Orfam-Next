import { ApiResponseProductBrandAndCategory } from "@/services/type";

export const calculateTotalPrice = (items: ApiResponseProductBrandAndCategory[]) => {
  if (!items || items.length === 0) {
    return 0;
  }

  const total: number = items.reduce((total: number, item: ApiResponseProductBrandAndCategory) => {
    return total + item.quantity * item.price;
  }, 0);

  return total;
};

export const calculateTotalPriceDiscount = ({ totalPrice, discount }: { totalPrice: number; discount: number }) => {
  const totalPriceDiscount = totalPrice - totalPrice * discount;

  return totalPriceDiscount;
};
