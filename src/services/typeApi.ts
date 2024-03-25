export interface ApiResponseProduct {
  id: number | string;
  title: string;
  typeProduct: string;
  status: string;
  price: number;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
export interface ProductData {
  data?: ApiResponseProduct[];
  pagination?: {
    _limit: number;
    _page: number;
    _totalRows: number;
    // Other properties if any
  };
  // Other properties if any
}
