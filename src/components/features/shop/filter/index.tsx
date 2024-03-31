import Checkbox from "@/shared/checkbox";
import React, { ChangeEvent, useState } from "react";
import Rate from "../../rate";
import { useCategories } from "@/hooks/useCategories";
import isDefined from "@/utils/isDefine";
import { useBrands } from "@/hooks/useBrand";
import useProductsStore from "@/store/useProductsStore";
import { useRouter } from "next/router";
import { Button } from "@/shared/button";

type FilterType = "selectedCategoryId" | "selectedBrandId" | "selectedRate";
type SaveAction = (value: number | null) => void;

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

  const storeActions = useProductsStore((state) => ({
    saveProductCategoryId: state.saveProductCategoryId,
    saveSearchValue: state.saveSearchValue,
    saveProductBrandId: state.saveProductBrandId,
    saveProductRate: state.saveProductRate,
  }));

  const handleFilterChange = (filterType: FilterType, id: number, saveAction: SaveAction) => {
    const newValue = filters[filterType] === id ? null : id;
    setFilters({ ...filters, [filterType]: newValue });
    saveAction(newValue);
    storeActions.saveSearchValue("");
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
    storeActions.saveProductCategoryId(null);
    storeActions.saveSearchValue("");
    storeActions.saveProductBrandId(null);
    storeActions.saveProductRate(null);
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
                  onChange={() => handleFilterChange("selectedCategoryId", category.id, storeActions.saveProductCategoryId)}
                />
                <h4 className="text-sm text-blue-ct7 font-medium ml-2">{category.name}</h4>
              </li>
            ))}
        </ul>
      </div>
      <div className="filter-brand mt-4">
        <h3 className="text-sm text-blue-ct7 font-semibold">FILTER BY BRAND</h3>
        <ul className="mt-5">
          {isDefined(brands) &&
            brands.map((brand) => (
              <li key={brand.id} className="flex items-center gap-2 my-2">
                <Checkbox
                  checked={filters.selectedBrandId === brand.id}
                  className="focus:shadow-none"
                  onChange={() => handleFilterChange("selectedBrandId", brand.id, storeActions.saveProductBrandId)}
                />
                <h4 className="text-sm text-blue-ct7 font-medium">{brand.name}</h4>
              </li>
            ))}
        </ul>
      </div>
      <div className="filter-rating mt-4">
        <h3 className="text-sm text-blue-ct7 font-semibold">FILTER BY RATING</h3>
        <ul className="mt-5">
          {rates.map((rate) => (
            <li key={rate} className="flex items-center gap-2 my-2">
              <Checkbox
                checked={filters.selectedRate === rate}
                className="focus:shadow-none"
                onChange={() => handleFilterChange("selectedRate", rate, storeActions.saveProductRate)}
              />
              <Rate rating={rate} />
              <span className="text-blue-ct7 text-sm font-medium">({rate} star)</span>
            </li>
          ))}
        </ul>
      </div>
      <Button onClick={handleResetFilter} className="w-full">
        Reset Filter
      </Button>
    </div>
  );
};

export default FilterProduct;
