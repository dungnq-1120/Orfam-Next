import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useOrders } from "@/hooks/useOrder";

import Loading from "@/shared/loading";

import PublicLayout from "@/components/layouts/publicLayout";
import User from "..";

import type { TOrder, TUser } from "@/components/features/checkout/type";

import isDefined from "@/utils/isDefine";

import checkSuccess from "@/image/icon/check.svg";

const Order = () => {
  const { orders, isLoading } = useOrders<TOrder[]>();
  const [myOrder, setMyOrder] = useState<TOrder | null>(null);


  return (
    <>
      <div className="p-3 shadow-shadow2 ">
        <h3 className="font-semibold text-blue-ct7 text-lg">Tracking Order</h3>
        <div className="flex justify-center items-center mt-6 xs:justify-between">
          <div>
            <Image className="w-10 h-10 m-auto md:w-8 md:h-8 xs:w-6 xs:h-6" src={checkSuccess} alt="" />
            <span className="text-sm text-green-500 font-semibold md:text-xs">Placed</span>
          </div>
          <span className="w-1/4 h-1 bg-green-ct5 rounded-xl lg:w-1/5 md:w-1/6 sm:!w-2/12 sm:h-0.5 xs:!w-[100%]"></span>
          <div>
            <Image className="w-10 h-10 m-auto md:w-8 md:h-8 xs:w-6 xs:h-6" src={checkSuccess} alt="" />
            <span className="text-sm text-green-500 font-semibold md:text-xs">Packed</span>
          </div>
          <span className="w-1/4 h-1 bg-gray-400 rounded-xl lg:w-1/5 md:w-1/6 sm:!w-2/12 sm:h-0.5 xs:!w-[100%]"></span>
          <div>
            <Image className="w-10 h-10 m-auto grayscale md:w-8 md:h-8 xs:w-6 xs:h-6" src={checkSuccess} alt="" />
            <span className="text-sm md:text-xs">Ship</span>
          </div>
          <span className="w-1/4 h-1 bg-gray-400 rounded-xl lg:w-1/5 md:w-1/6 sm:!w-2/12 sm:h-0.5 xs:!w-[100%]"></span>
          <div>
            <Image className="w-10 h-10 m-auto grayscale md:w-8 md:h-8 xs:w-6 xs:h-6" src={checkSuccess} alt="" />
            <span className="text-sm md:text-xs">Delivered</span>
          </div>
        </div>
      </div>
      <div className="p-3 shadow-shadow2 mt-8">
        <h3 className="font-semibold text-blue-ct7 text-lg">My Order</h3>
        <div className="list-order flex flex-wrap gap-3 mt-4 w-full">
          {isDefined(myOrder) ? (
            myOrder.carts.map((cart) => (
              <div className="flex flex-1 p-4 shadow-shadow2 bg-white rounded-md sm:flex-none sm:w-full" key={cart.id}>
                <Image className="w-20 h-20" width={550} height={550} src={cart.image} alt="" />
                <div className="truncate">
                  <h5 className="text-sm text-blue-ct7 font-semibold truncate">{cart.title}</h5>
                  <h6 className="text-xs font-semibold text-gray-400 truncate">{cart.categories.name}</h6>
                  <h6 className="text-xs font-semibold text-red-400 truncate">{cart.price.toFixed(2)}</h6>
                  <h6 className="text-xs font-semibold text-green-400 truncate">Placed</h6>
                </div>
              </div>
            ))
          ) : (
            <h3 className="m-auto font-semibold text-blue-ct7 p-8">NO PRODUCT</h3>
          )}
        </div>
      </div>
    </>
  );
};

Order.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <PublicLayout>
      <User>{page}</User>
    </PublicLayout>
  );
};

export default Order;
