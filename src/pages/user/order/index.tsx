import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useOrders } from "@/hooks/useOrder";

import PublicLayout from "@/components/layouts/publicLayout";
import User from "..";

import type { TMyProfile, TOrder } from "@/components/features/checkout/type";

import isDefined from "@/utils/isDefine";

import checkSuccess from "@/image/icon/check.svg";
import useToken from "@/hooks/useToken";

const Order = () => {
  const tokenInfo = useToken();
  const { orders, refreshOrders } = useOrders<TOrder[]>({ _expand: "userCarts", userCartsId: tokenInfo && tokenInfo.id }, tokenInfo ? false : true);

  const statusOrders = ["Placed", "Packed", "Shipping", "Delivered"];
  const itemStatusShip = statusOrders.findIndex((item) => item === orders[0]?.status);
  const trackedStatuses = statusOrders.slice(0, itemStatusShip + 1);

  return (
    <>
      <div className="p-3 shadow-shadow2 ">
        <h3 className="font-semibold text-blue-ct7 text-lg">Tracking Order</h3>
        <div className="flex justify-center items-center mt-6 xs:justify-between">
          {statusOrders.map((status, index) => (
            <React.Fragment key={index}>
              <div>
                <Image
                  className={`w-10 h-10 m-auto md:w-8 md:h-8 xs:w-6 xs:h-6 ${status} ${!trackedStatuses.includes(status) && "grayscale"}`}
                  src={checkSuccess}
                  alt=""
                />
                <span className={`text-sm ${status} ${trackedStatuses.includes(status) && "text-green-500 font-semibold"}`}>{status}</span>
              </div>
              {index < statusOrders.length - 1 && (
                <span
                  className={`w-1/4 h-1 ${
                    trackedStatuses.includes(status) ? (index === trackedStatuses.length - 1 ? "bg-gray-500" : "bg-green-ct5") : "bg-gray-500"
                  } rounded-xl lg:w-1/5 md:w-1/6 sm:!w-2/12 sm:h-0.5 xs:!w-[100%]`}
                ></span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="p-3 shadow-shadow2 mt-8">
        <h3 className="font-semibold text-blue-ct7 text-lg">My Order</h3>
        <div className="list-order flex flex-wrap gap-3 mt-4 w-full">
          {isDefined(orders[0]?.carts) ? (
            orders[0].carts.map((order) => (
              <div className="flex flex-1 p-4 shadow-shadow2 bg-white rounded-md sm:flex-none sm:w-full" key={order.id}>
                <Image className="w-20 h-20" width={550} height={550} src={order.image} alt="" />
                <div className="truncate">
                  <h5 className="text-sm text-blue-ct7 font-semibold truncate">{order.title}</h5>
                  <h6 className="text-xs font-semibold text-gray-400 truncate">{order.categories?.name}</h6>
                  <h6 className="text-xs font-semibold text-red-400 truncate">{order.price?.toFixed(2)}</h6>
                  <h6 className="text-xs font-semibold text-green-400 truncate">{orders[0].status}</h6>
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
