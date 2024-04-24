import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

import { useOrders } from "@/hooks/useOrder";
import useToken from "@/hooks/useToken";

import PrivateLayout from "@/components/layouts/privateLayout";
import { Button } from "@/shared/button";
import Loading from "@/shared/loading";

import type { TOrder } from "@/components/features/checkout/type";

import checkSuccess from "@/image/icon/check.svg";
import isDefined from "@/utils/isDefine";

const Bill = () => {
  const router = useRouter();
  const tokenInfo = useToken();
  const { orders, refreshOrders, isLoading } = useOrders<TOrder[]>(
    { _expand: "userCarts", userCartsId: tokenInfo && tokenInfo.id },
    { disable: !tokenInfo }
  );

  const order = orders && orders.slice().reverse()[0];

  return (
    <>
      <div className="bill py-12 mt-16">
        <div className="max-w-md m-auto ">
          <div className="line-green bg-green-400 h-2 rounded-lg"></div>
          <div className="content-bill pt-12 text-center shadow-lg pb-10 px-3 rounded-md">
            <Image className="w-14 h-14 m-auto " src={checkSuccess} alt="checkSuccess" />
            <h4 className="font-semibold  mt-2 text-2xl mb-1 text-green-ct5">Order Success</h4>
            <span className="text-lg tracking-[.25em] text-green-ct5 block">********************************</span>
            <h5 className="mt-5 font-semibold text-lg text-blue-ct5 mb-4">Order Information</h5>
            {isLoading && <Loading types="primary" className="mt-10 mb-10" />}
            {isDefined(order) && (
              <ul key={order.id}>
                <li className="font-semibold text-green-600">
                  Consignee name: <span className="text-green-ct5">{order.name}</span>
                </li>
                <li className="my-2 font-semibold text-green-600">
                  Consignee phone: <span className="text-green-ct5">{order.phone}</span>
                </li>
                <li className="font-semibold text-green-600">
                  Consignee address: <span className="text-green-ct5">{order.address}</span>
                </li>
              </ul>
            )}
            <h5 className="mt-5 font-semibold text-lg text-blue-ct5">Payment Methods</h5>
            <p className="mt-2 font-semibold text-green-600">Payment upon delivery (COD)</p>
            <Button
              onClick={() => {
                router.push("/");
              }}
              types="success"
              className="mt-4 w-full py-3"
            >
              GO HOME
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

Bill.getLayout = function getLayout(page: React.ReactElement) {
  return <PrivateLayout>{page}</PrivateLayout>;
};

export default Bill;
