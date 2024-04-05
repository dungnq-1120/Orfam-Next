import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useShallow } from "zustand/react/shallow";
import { useProducts } from "@/hooks/useProducts";
import useProductsStore from "@/store/useProductsStore";

import { Button } from "@/shared/button";
import Loading from "@/shared/loading";
import { ProductDataCategory } from "@/services/type";
import CardProduct from "../../card";

import { calculateTotalPages } from "@/utils/totalPage";
import isDefined from "@/utils/isDefine";
import { LIMIT } from "@/utils/const";

const CardList = () => {
  const router = useRouter();
  const initialPage = parseInt(router.query._page as string) || 1;
  const [page, setPage] = useState<number>(initialPage);

  const { searchValue, productCategoryId, productBrandId, productRate } = useProductsStore(
    useShallow((state) => ({
      searchValue: state.searchValue,
      productCategoryId: state.productCategoryId,
      productBrandId: state.productBrandId,
      productRate: state.productRate,
    }))
  );

  const { products, isLoading } = useProducts<ProductDataCategory>({
    _expand: ["categories", "brands"],
    title_like: searchValue,
    _page: searchValue === "" ? page : 1,
    _limit: 10,
    categoriesId: productCategoryId,
    brandsId: productBrandId,
    rate: productRate,
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
      <div className="card-shop w-[80%] lg:w-full">
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
        </div>
        <div className="flex flex-wrap gap-4 mt-5 justify-center">
          {isLoading && <Loading types="primary" size="md" containerClassName="h-[500px]" />}
          {isDefined(products) &&
            products.data.map((product) => (
              <CardProduct
                key={product.id}
                id={product.id}
                thumbnail={product.image}
                category={product.categories.name}
                name={product.title}
                price={product.price}
                salePercentage={product.status}
                rating={product.rate}
                className="w-60"
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
