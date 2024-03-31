import React, { useEffect, useRef, useState } from "react";
import Dropdown from "@/shared/dropdown";
import CardProduct from "../../card";
import { useProducts } from "@/hooks/useProducts";
import isDefined from "@/utils/isDefine";
import Loading from "@/shared/loading";
import { ProductDataCategory } from "@/services/typeApi";
import { Button } from "@/shared/button";
import { useRouter } from "next/router";
import useProductsStore from "@/store/useProductsStore";
import { calculateTotalPages } from "@/utils/totalPage";

const CardList = () => {
  const options = [
    { id: 1, name: "Price Low To High" },
    { id: 2, name: "Default sorting" },
    { id: 3, name: "New Arrivals" },
    { id: 4, name: "Price High To Low" },
  ];

  const router = useRouter();
  const initialPage = parseInt(router.query._page as string) || 1;
  const [page, setPage] = useState<number>(initialPage);
  const LIMIT = 10;

  const { searchValue, productCategoryId, productBrandId, productRate } = useProductsStore((state) => ({
    searchValue: state.searchValue,
    productCategoryId: state.productCategoryId,
    productBrandId: state.productBrandId,
    productRate: state.productRate,
  }));

  const { products, isLoading } = useProducts<ProductDataCategory>({
    _expand: ["categories", "brands"],
    title_like: searchValue,
    _page: searchValue === "" ? page : 1,
    _limit: 10,
    categoriesId: productCategoryId !== null ? productCategoryId : null,
    brandsId: productBrandId !== null ? productBrandId : null,
    rate: productRate !== null ? productRate : null,
  });

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage]);

  const totalPages = calculateTotalPages(products, LIMIT);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push({
      query: {
        _limit: LIMIT,
        _page: newPage,
      },
    });
  };

  return (
    <>
      <div className="card-shop w-3/4 lg:w-full">
        <div className="shop-text-heading bg-[url('https://orfarm-next-js.vercel.app/assets/img/banner/shop-bg-1.jpg')] text-white text-center py-10 rounded-xl">
          <h4 className="text-sm text-yellow-300 font-semibold sm:text-xs">THE SALAD</h4>
          <h3 className="text-2xl my-3 font-bold sm:text-xl">
            Fresh & Natural <br />
            Healthy Food Special Offer
          </h3>
          <p className="font-medium text-sm sm:text-xs">Do not miss the current offers of us!</p>
        </div>
        <div className="bg-white shadow-xl mt-4 rounded-xl px-8 py-4 flex justify-between sm:block">
          <h4 className="text-sm text-blue-ct7 font-semibold">
            Showing
            <span className="text-green-600 font-semibold ml-1">
              <span>{products?.data[0]?.id || 0} </span> -<span> {products?.data[products?.data.length - 1]?.id || 0} </span>
            </span>
            of
            <span className="text-green-600 font-semibold"> {products?.pagination._totalRows}</span> Products
          </h4>
          <Dropdown options={options} />
        </div>
        <div className="flex flex-wrap gap-3 mt-5 justify-center">
          {isLoading && <Loading types="primary" size="md" containerClassName="h-[500px]" />}
          {isDefined(products) &&
            products.data.map((product) => (
              <CardProduct
                key={product.id}
                imageUrl={product.image}
                category={product.categories.name}
                productTitle={product.title}
                price={product.price}
                salePercentage={product.status}
                rating={product.rate}
                className="w-56"
              />
            ))}
        </div>
        <div className="pagination flex justify-center gap-2 mt-12">
          {isDefined(totalPages) &&
            Array.from({ length: totalPages }, (_, index) => (
              <Button
                className={`w-10 h-10 rounded-full  ${index + 1 === initialPage && "bg-orange-500"} `}
                key={index}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
        </div>
      </div>
    </>
  );
};

export default CardList;
