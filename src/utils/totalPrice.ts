export const calculateTotalPrice = <T>(items: T[], calculatePrice: (item: T) => number): string => {
  if (!items || items.length === 0) {
    return "0";
  }

  const totalPrice: number = items.reduce((total: number, item: T) => {
    return total + calculatePrice(item);
  }, 0);

  return totalPrice.toFixed(2);
};
