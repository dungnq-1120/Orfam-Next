import Image from "next/image";
import React from "react";

import { useOrders } from "@/hooks/useOrder";
import { useRouter } from "next/router";

import PublicLayout from "@/components/layouts/publicLayout";
import { Button } from "@/shared/button";

import type { TOrder } from "@/components/features/checkout/type";
import checkSuccess from "@/image/icon/check.svg";

const Bill = () => {
  const { orders } = useOrders<TOrder[]>();
  const router = useRouter();
  return (
    <>
      <div className="bill py-12 mt-16">
        <div className="max-w-md m-auto ">
          <div className="line-green bg-green-400 h-2 rounded-lg"></div>
          <div className="content-bill pt-12 text-center shadow-lg pb-10 px-3 rounded-md">
            <Image className="w-14 h-14 m-auto " src={checkSuccess} alt="checkSuccess" />
            <h4 className="font-semibold  mt-2 text-2xl">Order Success</h4>
            <span className="text-lg tracking-[.25em]  block">********************************</span>
            <h5 className="mt-5 font-semibold text-lg">Order Information</h5>

            {orders.length > 0 && (
              <ul>
                <li className="font-medium">{orders[0].name}</li>
                <li className="my-2 font-medium">{orders[0].phone}</li>
                <li className="font-medium">{orders[0].address}</li>
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
  return <PublicLayout>{page}</PublicLayout>;
};

export default Bill;
