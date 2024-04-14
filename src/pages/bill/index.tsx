import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useOrders } from "@/hooks/useOrder";

import PrivateLayout from "@/components/layouts/privateLayout";
import { Button } from "@/shared/button";

import type { TMyProfile, TOrder } from "@/components/features/checkout/type";

import checkSuccess from "@/image/icon/check.svg";
import isDefined from "@/utils/isDefine";
import { useProfile } from "@/hooks/useProfile";

const Bill = () => {
  const router = useRouter();
  const { orders } = useOrders<TOrder[]>();
  const [order, setOrder] = useState<TOrder>();
  const { profile } = useProfile<TMyProfile>();

  useEffect(() => {
    if (orders.length > 0 && profile && profile.data) {
      const orderInfo = orders.find((order) => order.cartsOrder.map((cart) => cart.userId === profile.data.id));
      setOrder(orderInfo);
    }
  }, [orders, profile]);

  return (
    <>
      <div className="bill py-12 mt-16">
        <div className="max-w-md m-auto ">
          <div className="line-green bg-green-400 h-2 rounded-lg"></div>
          <div className="content-bill pt-12 text-center shadow-lg pb-10 px-3 rounded-md">
            <Image className="w-14 h-14 m-auto " src={checkSuccess} alt="checkSuccess" />
            <h4 className="font-semibold  mt-2 text-2xl mb-1 text-green-ct6">Order Success</h4>
            <span className="text-lg tracking-[.25em] text-green-ct6 block">********************************</span>
            <h5 className="mt-5 font-semibold text-lg">Order Information</h5>

            {isDefined(order) && (
              <ul className="mt-4">
                <li className="font-semibold text-blue-ct7">Consignee name: {order.name}</li>
                <li className="my-2 font-semibold text-blue-ct7">Consignee phone: {order.phone}</li>
                <li className="font-semibold text-blue-ct7">Consignee address: {order.address}</li>
              </ul>
            )}
            <h5 className="mt-5 font-semibold text-lg">Payment Methods</h5>
            <p className="mt-2 font-medium">Payment upon delivery (COD)</p>
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
