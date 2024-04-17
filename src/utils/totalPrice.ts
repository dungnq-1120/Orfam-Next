import { ApiResponseProductBrandAndCategory } from "@/services/type";

export const calculateTotalPrice = (items: ApiResponseProductBrandAndCategory[]) => {
  if (!items || items.length === 0) {
    return 0;
  }

  const totalPrice: number = items.reduce((total: number, item: ApiResponseProductBrandAndCategory) => {
    return total + item.quantity * item.price;
  }, 0);

  return totalPrice;
};

export const calculateTotalPriceDiscount = ({ totalPrice, discount }: { totalPrice: number; discount: string }) => {
  const totalPriceDiscount = totalPrice - totalPrice * (parseFloat(discount) / 100);
  return totalPriceDiscount;
};
