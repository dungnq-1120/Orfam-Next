import React, { useState } from "react";
import Image from "next/image";
import useSWRMutation from "swr/mutation";

import { useOrders } from "@/hooks/useOrder";

import Admin from "@/pages/admin/index";
import AdminLayout from "@/components/layouts/AdminLayout";

import { Button } from "@/shared/button";
import Modal from "@/shared/modal";

import { fetcherDelete, fetcherPatch } from "@/services/callApiService";

import type { TOrder } from "@/components/features/checkout/type";

import isDefined from "@/utils/isDefine";
import showToast from "@/utils/showToast";
import bin from "@/image/icon/bin.svg";

const Orders = () => {
  const [isOpenModalDetail, setOpenModalDetail] = useState<boolean>(false);
  const [isOpenModalStatusOrder, setOpenModalStatusOrder] = useState<boolean>(false);
  const [orderDetail, setOrderDetail] = useState<TOrder>();
  const [updateChangeShip, setUpdateChangeShip] = useState<TOrder>();
  const { orders, refreshOrders } = useOrders<TOrder[]>();

  const { trigger: updateShipStatus } = useSWRMutation("/orders", fetcherPatch);
  const { trigger: deleteOrder } = useSWRMutation("/orders", fetcherDelete);

  const statusOrders = ["Placed", "Packed", "Shipping", "Delivered"];
  const orderTableHeaders = ["Orderer", "Receiver", "Phone", "Email", "Address", "Delivery Type", "Ordered List", "Order Status", "Action"];
  const productTableHeaders = ["Image", "Title", "Category", "Quantity", "Discount", "Price", "Shipping", "Total", "Status"];

  const handleDetailProducts = (order: TOrder) => {
    console.log(order);

    setOrderDetail(order);
  };

  const handleDetailChangeStatusShip = (order: TOrder) => {
    setUpdateChangeShip(order);
  };

  const handleDeleteOrder = (order: TOrder) => {
    deleteOrder(order);
    refreshOrders();
    showToast({
      message: "Deleted successfully",
      type: "warning",
    });
  };

  return (
    <div className="shadow-shadow2 p-5 bg-white">
      <h3 className="text-blue-ct7 font-semibold text-lg p-5 sm:text-sm">ORDER MANAGEMENT</h3>
      <div className="overflow-x-auto">
        <table className="w-[120%] border-slate-500 lg:w-[200%] md:!w-[350%] text-sm">
          <thead>
            <tr>
              {orderTableHeaders.map((item) => (
                <th key={item} className="border-b-1 border-slate-200 py-4 px-3 text-blue-ct5">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isDefined(orders) &&
              orders.map((order, index) => (
                <tr key={`${order.id}-${index}`} className="text-center font-medium text-blue-ct6">
                  <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-orange-500">{order.carts[0].userCarts.name}</td>
                  <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-green-500">{order.name}</td>
                  <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-blue-600">{order.phone}</td>
                  <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-orange-600">{order.email}</td>
                  <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-yellow-500">{order.address}</td>
                  <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-green-500">{order.shipping.type}</td>
                  <td className="border-b-1 border-slate-200 py-3 px-3 flex-col items-center">
                    <Button
                      className="w-28 font-semibold py-3 mb-2 bg-blue-ct6 shadow-lg hover:bg-blue-600"
                      onClick={() => {
                        setOpenModalDetail(true);
                        handleDetailProducts(order);
                      }}
                    >
                      Detail
                    </Button>
                  </td>
                  <td className="border-b-1 border-slate-200 py-3 px-3 flex-col items-center">
                    <Button
                      className=" font-semibold py-3 mb-2 bg-orange-500 shadow-lg hover:bg-orange-400"
                      onClick={() => {
                        setOpenModalStatusOrder(true);
                        handleDetailChangeStatusShip(order);
                      }}
                    >
                      Change status ship
                    </Button>
                  </td>
                  <td className="border-b-1 border-slate-200 py-3 px-3 ">
                    <Button
                      onClick={() => {
                        handleDeleteOrder(order);
                      }}
                      className="w-28 font-semibold py-3 mb-2 bg-red-200 shadow-lg hover:bg-red-300"
                    >
                      <Image src={bin} alt="" className="w-6 h-6" />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Modal className="opacity-40" isOpenModal={isOpenModalDetail} onCancel={setOpenModalDetail}>
        <div className="bg-white p-5 rounded-lg w-[800px] mdd:w-[735px] md:!w-[500px] m-auto xss:!w-[310px] ">
          <h3 className="text-center font-bold text-blue-ct7 mb-3">DETAIL PRODUCT LIST</h3>
          <div className="overflow-auto h-72">
            <table className=" w-[150%] sm:w-[200%] xss:w-[300%]">
              <thead className="sticky -top-1 bg-white">
                <tr className="text-sm sm:text-xs">
                  {productTableHeaders.map((item) => (
                    <th key={item} className="border-b-1 border-slate-200 py-4 px-3 text-blue-ct5">
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isDefined(orderDetail) &&
                  orderDetail.carts.map((cart) => (
                    <tr key={cart.id} className="text-center text-sm font-medium text-blue-ct6 sm:text-xs">
                      <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-green-500">
                        <Image width={550} height={550} className="w-20 h-20 m-auto  object-cover" src={cart.image} alt="" />
                      </td>
                      <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-blue-ct7">{cart.title}</td>
                      <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-blue-500">
                        <span className="py-1 px-2 bg-blue-200 rounded">{cart.categories.name}</span>
                      </td>
                      <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-yellow-500">{cart.quantity}</td>
                      <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-green-500">
                        <span className="bg-orange-200 text-orange-500 px-2 py-1 rounded">{orderDetail.discount.code}</span>
                      </td>
                      <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-orange-500">{cart.price.toFixed(2)}</td>
                      <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-green-500">{orderDetail.shipping.price.toFixed(2)}</td>
                      <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-red-500">
                        {(cart.quantity * cart.price + orderDetail.shipping.price).toFixed(2)}
                      </td>
                      <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-green-500">
                        <span className="px-2 py-1 rounded bg-green-200">{orderDetail.status}</span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
      <Modal className="opacity-40" isOpenModal={isOpenModalStatusOrder} onCancel={setOpenModalStatusOrder}>
        <ul className="bg-white w-[300px] rounded-sm">
          {statusOrders.map((status) => (
            <li
              onClick={() => {
                if (updateChangeShip && updateChangeShip.id) {
                  const newUpdateChangeShip = { ...updateChangeShip, status: status };
                  updateShipStatus(newUpdateChangeShip);
                  refreshOrders();
                }
                setOpenModalStatusOrder(false);
                showToast({
                  message: "Update successful delivery status",
                  type: "success",
                });
              }}
              className="bg-blue-ct5 cursor-pointer text-white p-3 hover:bg-green-ct5"
              key={status}
            >
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
    <AdminLayout>
      <Admin>{page}</Admin>
    </AdminLayout>
  );
};

export default Orders;
