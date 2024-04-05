import React, { useState } from "react";
import payments from "@/image/icon/payment-2.webp";
import Image from "next/image";
import { Button } from "@/shared/button";
import InputForm from "@/shared/input";
import { useRouter } from "next/router";
import { useProducts } from "@/hooks/useProducts";
import Loading from "@/components/features/loading";
import isDefined from "@/utils/isDefine";
import { ApiResponseProductBrandAndCategory } from "@/services/type";
import { useCarts } from "@/hooks/useCart";
import useSWRMutation from "swr/mutation";
import { fetcherPatch, fetcherPost } from "@/services/callApiService";

const InfoProduct = () => {
  const router = useRouter();
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const { products, isLoading } = useProducts<ApiResponseProductBrandAndCategory[]>({ _expand: ["categories", "brands"], id: router.query.id });
  const { carts, refreshCarts } = useCarts<ApiResponseProductBrandAndCategory[]>();
  const { trigger: updateCart } = useSWRMutation("/carts", fetcherPatch);
  const { trigger: addToCart } = useSWRMutation("/carts", fetcherPost);

  const handleAddCart = (id: number, product: ApiResponseProductBrandAndCategory) => {
    const cartIndex = carts.findIndex((cart) => cart.id === id);

    if (cartIndex === -1) {
      const newCart = { ...product, quantity: productQuantity };
      addToCart(newCart);
    } else {
      const newCart = { ...product, quantity: productQuantity + carts[cartIndex].quantity };
      updateCart(newCart);
    }
    refreshCarts();
  };

  return (
    <div className="info-product gap-2 w-full">
      {<Loading isLoading={isLoading} />}
      {isDefined(products) &&
        products.map((product) => (
          <div key={product.id} className=" shadow-xl p-5">
            <div className="py-5 inline-block">
              <h3 className="font-semibold text-2xl text-blue-ct7 xs:text-xl">{product.title}</h3>
              <ul className="flex justify-between mt-3 text-sm text-blue-ct7 font-medium xs:text-xs">
                <li>
                  Brands: <span className="text-green-ct5 font-semibold">{product.brands.name}</span>
                </li>
                <li>
                  SKU: <span className="text-green-ct5 font-semibold">005</span>
                </li>
              </ul>
            </div>
            <div className="product-content-detail border-t-1 flex gap-5 pt-6 nm:items-center csm:block">
              <div className="overflow-hidden w-full h-full">
                <Image
                  src={product.image}
                  width={550}
                  height={550}
                  alt=""
                  className="w-full h-full object-cover csm:w-2/4 csm:h-2/4 csm:m-auto xs:w-full xs:h-full"
                />
              </div>
              <div className="detail w-full">
                <h3 className="text-red-600 font-semibold text-2xl xs:text-xl">
                  $ <span>{product.price.toFixed(2)}</span>
                </h3>
                <ul className="list-disc text-blue-ct6 text-sm font-medium pl-5 mt-3 pb-4 border-b-1 xs:text-xs">
                  <li>Delicious non - dairy cheese sauce</li>
                  <li className="my-1">Vegan & Allergy friendly</li>
                  <li>Smooth, velvety dairy free cheese sauce</li>
                </ul>
                <div className="quantity-product flex items-center gap-5 py-6 border-b-1 xs:block">
                  <span className="text-sm font-semibold text-blue-ct7 xs:block xs:text-center">QTY:</span>
                  <div className="inline-flex items-center bg-gray-100 rounded-3xl py-1 w-28 xs:!flex xs:w-full xs:mt-4">
                    <Button
                      onClick={() => {
                        if (productQuantity > 1) {
                          setProductQuantity(productQuantity - 1);
                        }
                      }}
                      className="text-blue-ct7 px-0 py-0 w-full h-full flex justify-center items-center text-4xl leading-none bg-transparent"
                    >
                      -
                    </Button>
                    <InputForm
                      className="text-blue-ct7 p-0 font-semibold w-full text-center h-full border-0 bg-transparent"
                      value={productQuantity}
                      readOnly
                    />
                    <Button
                      onClick={() => {
                        setProductQuantity(productQuantity + 1);
                      }}
                      className="text-blue-ct7 px-0 py-0 w-full h-full flex justify-center items-center text-2xl bg-transparent"
                    >
                      +
                    </Button>
                  </div>
                  <Button onClick={() => handleAddCart(product.id, product)} types="success" className="py-3 px-12 rounded-3xl xs:w-full xs:mt-4">
                    ADD TO CART
                  </Button>
                </div>
                <ul className="pt-6 text-sm font-medium text-blue-ct7 xs:text-xs">
                  <li>
                    Availability: <span className="text-green-400 font-semibold">50 In stock</span>
                  </li>
                  <li className="my-2">
                    Categories: <span>{product.categories.name}</span>
                  </li>
                  <li>Tags: Apricots, Fresh</li>
                </ul>
                <div className="bg-gray-200 text-center py-4 rounded-lg mt-5">
                  <Image className="m-auto px-3" src={payments} alt="" />
                  <span className="text-blue-ct7 font-medium text-sm mt-3 block xs:text-xs">Guarantee safe & Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default InfoProduct;
