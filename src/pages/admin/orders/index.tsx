import React, { useState } from "react";
import Image from "next/image";

import Admin from "..";
import PrivateLayout from "@/components/layouts/privateLayout";

import { Button } from "@/shared/button";
import Modal from "@/shared/modal";

import cherry from "@/image/product/product-img-15.webp";

const Orders = () => {
  const [isOpenModalDetail, setOpenModalDetail] = useState<boolean>(false);
  const [isOpenModalStatusOrder, setOpenModalStatusOrder] = useState<boolean>(false);
  const statusOrders = ["Placed", "Packed", "Ship", "Delivered"];

  return (
    <div className="shadow-shadow2 p-5 ">
      <h3 className="text-blue-ct7 font-semibold text-lg p-5">ORDER MANAGEMENT</h3>
      <div className="overflow-x-auto">
        <table className="border-collapse border w-[120%] border-slate-500 lg:w-[200%] md:!w-[350%] ">
          <thead>
            <tr>
              <th className="border border-slate-600 py-3">Orderer</th>
              <th className="border border-slate-600 py-3">Receiver</th>
              <th className="border border-slate-600 py-3">Phone</th>
              <th className="border border-slate-600 py-3">Email</th>
              <th className="border border-slate-600 py-3">Address</th>
              <th className="border border-slate-600 py-3">Delivery Type</th>
              <th className="border border-slate-600 py-3">Ordered List</th>
              <th className="border border-slate-600 py-3">Order Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center font-medium text-blue-ct6">
              <td className="border border-slate-600">Jack</td>
              <td className="border border-slate-600">Hien</td>
              <td className="border border-slate-600">0998883473</td>
              <td className="border border-slate-600">Jack@gmail.com</td>
              <td className="border border-slate-600">HCM</td>
              <td className="border border-slate-600">Fast</td>
              <td className="border border-slate-600 px-3 py-2 flex-col items-center">
                <Button
                  onClick={() => {
                    setOpenModalDetail(true);
                  }}
                >
                  Detail
                </Button>
              </td>
              <td className="border border-slate-600 px-3 py-2 flex-col items-center">
                <Button
                  onClick={() => {
                    setOpenModalStatusOrder(true);
                  }}
                >
                  Change status
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Modal className="opacity-40" isOpenModal={isOpenModalDetail} onCancel={setOpenModalDetail}>
        <div className="bg-white p-5 rounded-lg w-[800px] mdd:w-full sm:!w-9/12 m-auto xss:w-[400px] xs:!w-[310px]">
          <h3 className="text-center font-bold text-blue-ct7 mb-3">DETAIL PRODUCT LIST</h3>
          <div className="overflow-auto h-72">
            <table className="border-collapse border border-slate-500 w-[130%] sm:w-[200%] xss:w-[300%]">
              <thead className="sticky -top-1 bg-white">
                <tr className="text-sm">
                  <th className="border border-slate-600 py-3 px-3">Image</th>
                  <th className="border border-slate-600 py-3 px-3">Title</th>
                  <th className="border border-slate-600 py-3 px-3">Category</th>
                  <th className="border border-slate-600 py-3 px-3">Quantity</th>
                  <th className="border border-slate-600 py-3 px-3">Shipping</th>
                  <th className="border border-slate-600 py-3 px-3">Total</th>
                  <th className="border border-slate-600 py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center text-sm font-medium text-blue-ct6">
                  <td className="border border-slate-600 px-2">
                    <Image className="w-20 h-20 m-auto  object-cover" src={cherry} alt="" />
                  </td>
                  <td className="border border-slate-600 px-2 text-blue-ct7 font-semibold">Fresh orange super pro</td>
                  <td className="border border-slate-600 px-2 text-blue-ct7 font-semibold">Fresh Fruits</td>
                  <td className="border border-slate-600 px-2 text-blue-ct7">2</td>
                  <td className="border border-slate-600 px-2 text-blue-ct7">10.00</td>
                  <td className="border border-slate-600 px-2 text-red-500 font-semibold">17.00</td>
                  <td className="border border-slate-600 px-2 text-green-500 font-semibold">Placed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
      <Modal className="opacity-40" isOpenModal={isOpenModalStatusOrder} onCancel={setOpenModalStatusOrder}>
        <ul className="bg-white w-[300px] rounded-sm">
          {statusOrders.map((status) => (
            <li className="bg-blue-ct5 cursor-pointer text-white p-3 hover:bg-green-ct5" key={status}>
              {status}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

Orders.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <PrivateLayout>
      <Admin>{page}</Admin>
    </PrivateLayout>
  );
};

export default Orders;
