import isDefined from "./isDefine";

interface ProductsWithPagination {
  pagination: {
    _totalRows: number;
  };
}

export function calculateTotalPages(products: ProductsWithPagination | undefined, limit: number) {
  if (isDefined(products)) {
    const totalRows = products.pagination._totalRows;
    const totalPages = Math.ceil(totalRows / limit);
    return totalPages;
  }
  return null;
}
