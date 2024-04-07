import React from "react";
import Image from "next/image";

import useToastStore from "@/store/useToast";
import { useShallow } from "zustand/react/shallow";

import InfoProduct from "./infoProduct";
import Description from "./description";

import packet from "@/image/icon/package.svg";
import protect from "@/image/icon/protect.svg";
import Toast from "@/shared/toast";

const ProductDetail = () => {
  const { isOpen, message, type } = useToastStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      message: state.message,
      type: state.type,
    }))
  );
  return (
    <div className="flex gap-5 pb-5 mdd:flex-col">
      <Toast isOpen={isOpen} message={message} type={type} />
      <div className="w-4/5 mdd:w-full">
        <InfoProduct />
        <Description />
      </div>
      <div className="sidebar w-1/5 sticky top-24 h-[500px] mdd:w-full mdd:h-full">
        <div className="sidebar-intro">
          <div className="bg-gray-100 rounded-lg border-1 border-red-500 p-4 text-center">
            <div className="py-6">
              <Image src={packet} alt="" className="w-5 h-5 m-auto" />
              <span className="text-red-500 font-medium text-xs mt-3 block">Free shipping apply to all orders over $90</span>
            </div>
            <div className="py-6 border-dashed border-t-1 border-b-1 border-red-500">
              <Image src={protect} alt="" className="w-5 h-5 m-auto" />
              <span className="text-red-500 font-medium text-xs mt-3 block">Guaranteed 100% Organic from nature farms</span>
            </div>
            <div className="py-6">
              <Image src={packet} alt="" className="w-5 h-5 m-auto" />
              <span className="text-red-500 font-medium text-xs mt-3 block">60 days returns if you change your mind</span>
            </div>
            <div className="py-6 border-dashed border-t-1 border-red-500">
              <Image src={protect} alt="" className="w-5 h-5 m-auto " />
              <span className="text-red-500 font-medium text-xs mt-3 block">60 days returns if you change your mind</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
