import React, { useState } from "react";

import { useCategories } from "@/hooks/useCategories";
import { useBrands } from "@/hooks/useBrand";
import { useRouter } from "next/router";
import { useShallow } from "zustand/react/shallow";
import useProductsStore from "@/store/useProductsStore";

import { Button } from "@/shared/button";
import Checkbox from "@/shared/checkbox";

import isDefined from "@/utils/isDefine";
import Rate from "../../rate";

enum FilterType {
  selectedCategoryId = "selectedCategoryId",
  selectedBrandId = "selectedBrandId",
  selectedRate = "selectedRate",
}

type setAction = (value: number | null) => void;

const FilterProduct = () => {
  const router = useRouter();
  const rates = [1, 2, 3, 4, 5];
  const { categories } = useCategories();
  const { brands } = useBrands();

  const [filters, setFilters] = useState({
    selectedCategoryId: null,
    selectedBrandId: null,
    selectedRate: null,
  });

  const storeActions = useProductsStore(
    useShallow((state) => ({
      setProductCategoryId: state.setProductCategoryId,
      setSearchValue: state.setSearchValue,
      setProductBrandId: state.setProductBrandId,
      setProductRate: state.setProductRate,
    }))
  );

  const handleFilterChange = (filterType: FilterType, id: number, setAction: setAction) => {
    const newValue = filters[filterType] === id ? null : id;
    //chức năng khi checkbox thì chỉ checked 1 checkbox
    setFilters({ ...filters, [filterType]: newValue });
    setAction(newValue);
    storeActions.setSearchValue("");
    router.push({
      query: { _limit: 10, _page: 1 },
    });
  };

  const handleResetFilter = () => {
    setFilters({
      selectedCategoryId: null,
      selectedBrandId: null,
      selectedRate: null,
    });
    storeActions.setProductCategoryId(null);
    storeActions.setProductBrandId(null);
    storeActions.setProductRate(null);
  };

  return (
    <div className="filter-product overflow-y-scroll h-[510px] self-start bg-white px-10 py-6 w-1/4 rounded-xl shadow-2xl sticky top-32 xl:p-5 lg:w-full lg:relative lg:top-0 lg:mb-10">
      <div className="filter-categories">
        <h3 className="text-sm text-blue-ct7 font-semibold">PRODUCT CATEGORIES</h3>
        <ul className="mt-5">
          {isDefined(categories) &&
            categories.map((category) => (
              <li key={category.id} className="flex items-center gap-1 my-2">
                <Checkbox
                  checked={filters.selectedCategoryId === category.id}
                  className="focus:shadow-none"
                  onChange={() => handleFilterChange(FilterType.selectedCategoryId, category.id, storeActions.setProductCategoryId)}
                />
                <h4 className="text-sm text-blue-ct7 font-medium ml-2">{category.name}</h4>
              </li>
            ))}
        </ul>
      </div>
      <div className="filter-brand mt-4 border-t-2 pt-4 border-green-ct5">
        <h3 className="text-sm text-blue-ct7 font-semibold">FILTER BY BRAND</h3>
        <ul className="mt-5">
          {isDefined(brands) &&
            brands.map((brand) => (
              <li key={brand.id} className="flex items-center gap-2 my-2">
                <Checkbox
                  checked={filters.selectedBrandId === brand.id}
                  className="focus:shadow-none"
                  onChange={() => handleFilterChange(FilterType.selectedBrandId, brand.id, storeActions.setProductBrandId)}
                />
                <h4 className="text-sm text-blue-ct7 font-medium">{brand.name}</h4>
              </li>
            ))}
        </ul>
      </div>
      <div className="filter-rating mt-4 border-t-2 pt-4 border-green-ct5">
        <h3 className="text-sm text-blue-ct7 font-semibold">FILTER BY RATING</h3>
        <ul className="mt-5">
          {rates.map((rate) => (
            <li key={rate} className="flex items-center gap-2 my-2">
              <Checkbox
                checked={filters.selectedRate === rate}
                className="focus:shadow-none"
                onChange={() => handleFilterChange(FilterType.selectedRate, rate, storeActions.setProductRate)}
              />
              <Rate rating={rate} />
              <span className="text-blue-ct7 text-sm font-medium">({rate} star)</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="reset-filter mt-4 border-t-2 pt-4 border-green-ct5">
        <h3 className="text-sm text-blue-ct7 font-semibold">RESET FILTER</h3>
        <Button onClick={handleResetFilter} className="w-full mt-3">
          Reset Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterProduct;
