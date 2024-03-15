import Image from "next/image";
import React from "react";
import about from "@/image/banner-remove-bg/about-img-1.webp";
import icon from "@/image/icon/icon.png";
import icon_1 from "@/image/icon/icon_1_.png";
import icon_2 from "@/image/icon/icon_2_.png";

const Introduce = () => {
  return (
    <div className="introduce py-20 mt-20 ">
      <div className="flex-col items-center justify-center">
        <div className="text-center">
          <Image src={about} alt="" className="m-auto duration-500 hover:-translate-y-2" />
          <p className="font-medium text-blue-ct7 mt-8">
            We are Online Market of fresh fruits & vegetables. <br />
            You can also find organic & healthy juice, processed food as <br />
            well as gentle skin tcare at our store.
          </p>
        </div>
        <div className="boxes mt-10 flex justify-around w-full">
          <div className="box text-center group">
            <Image src={icon} alt="" className="m-auto duration-500 group-hover:-translate-y-2" />
            <h4 className="font-bold text-blue-ct7 mt-2 mb-2">Select Your Products</h4>
            <p className="text-sm text-blue-ct7 font-semibold">
              Choose from select produce to start. <br />
              Keep, add, or remove items.
            </p>
          </div>
          <div className="box text-center group">
            <Image src={icon_1} alt="" className="m-auto duration-500 group-hover:-translate-y-2" />
            <h4 className="font-bold text-blue-ct7 mt-2 mb-2">Our Shop Orfarm</h4>
            <p className="text-sm text-blue-ct7 font-semibold">
              We provide 100+ products, provide <br />
              enough nutrition for your family.
            </p>
          </div>
          <div className="box text-center group">
            <Image src={icon_2} alt="" className="m-auto duration-500 group-hover:-translate-y-2" />
            <h4 className="font-bold text-blue-ct7 mt-2 mb-2">Delivery To Your</h4>
            <p className="text-sm text-blue-ct7 font-semibold">
              Delivery to your door. Up to 100km
              <br />
              and it is completely free.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduce;
