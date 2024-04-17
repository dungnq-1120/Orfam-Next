import React, { useState } from "react";
import Image from "next/image";
import useSWRMutation from "swr/mutation";

import { useOrders } from "@/hooks/useOrder";

import Admin from "..";
import AdminLayout from "@/components/layouts/AdminLayout";

import { Button } from "@/shared/button";
import Modal from "@/shared/modal";

import { fetcherDelete, fetcherPatch } from "@/services/callApiService";

import type { TOrder } from "@/components/features/checkout/type";

import isDefined from "@/utils/isDefine";
import showToast from "@/utils/showToast";

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
    <div className="shadow-shadow2 p-5 ">
      <h3 className="text-blue-ct7 font-semibold text-lg p-5">ORDER MANAGEMENT</h3>
      <div className="overflow-x-auto">
        <table className="border-collapse border w-[120%] border-slate-500 lg:w-[200%] md:!w-[350%] ">
          <thead>
            <tr>
              {orderTableHeaders.map((item) => (
                <th key={item} className="border border-slate-600 py-3">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isDefined(orders) &&
              orders.map((order, index) => (
                <tr key={`${order.id}-${index}`} className="text-center font-medium text-blue-ct6">
                  <td className="border border-slate-600">{order.orderer}</td>
                  <td className="border border-slate-600">{order.name}</td>
                  <td className="border border-slate-600">{order.phone}</td>
                  <td className="border border-slate-600">{order.email}</td>
                  <td className="border border-slate-600">{order.address}</td>
                  <td className="border border-slate-600">{order.shipping.type}</td>
                  <td className="border border-slate-600 px-3 py-2 flex-col items-center">
                    <Button
                      onClick={() => {
                        setOpenModalDetail(true);
                        handleDetailProducts(order);
                      }}
                    >
                      Detail
                    </Button>
                  </td>
                  <td className="border border-slate-600 px-3 py-2 flex-col items-center">
                    <Button
                      onClick={() => {
                        setOpenModalStatusOrder(true);
                        handleDetailChangeStatusShip(order);
                      }}
                    >
                      Change status ship
                    </Button>
                  </td>
                  <td className="border border-slate-600 p-2">
                    <Button
                      onClick={() => {
                        handleDeleteOrder(order);
                      }}
                      className="bg-red-500 text-xs font-semibold"
                    >
                      DELETE
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Modal className="opacity-40" isOpenModal={isOpenModalDetail} onCancel={setOpenModalDetail}>
        <div className="bg-white p-5 rounded-lg w-[800px] mdd:w-full sm:!w-9/12 m-auto xss:w-[400px] xs:!w-[310px]">
          <h3 className="text-center font-bold text-blue-ct7 mb-3">DETAIL PRODUCT LIST</h3>
          <div className="overflow-auto h-72">
            <table className="border-collapse border border-slate-500 w-[150%] sm:w-[200%] xss:w-[300%]">
              <thead className="sticky -top-1 bg-white">
                <tr className="text-sm">
                  {productTableHeaders.map((item) => (
                    <th key={item} className="border border-slate-600 py-3 px-3">
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isDefined(orderDetail) &&
                  orderDetail.cartsOrder.map((cart) => (
                    <tr key={cart.id} className="text-center text-sm font-medium text-blue-ct6">
                      <td className="border border-slate-600 px-2">
                        <Image width={550} height={550} className="w-20 h-20 m-auto  object-cover" src={cart.image} alt="" />
                      </td>
                      <td className="border border-slate-600 px-2 text-blue-ct7 font-semibold">{cart.title}</td>
                      <td className="border border-slate-600 px-2 text-blue-ct7 font-semibold">{cart.categories.name}</td>
                      <td className="border border-slate-600 px-2 text-blue-ct7">{cart.quantity}</td>
                      <td className="border border-slate-600 px-2 text-blue-ct7">{cart?.discount ? cart.discount.discount : 0}</td>
                      <td className="border border-slate-600 px-2 text-blue-ct7">{cart.price.toFixed(2)}</td>
                      <td className="border border-slate-600 px-2 text-blue-ct7">{orderDetail.shipping.price.toFixed(2)}</td>
                      <td className="border border-slate-600 px-2 text-red-500 font-semibold">
                        {(cart.quantity * cart.price + orderDetail.shipping.price).toFixed(2)}
                      </td>
                      <td className="border border-slate-600 px-2 text-green-500 font-semibold">{orderDetail.status}</td>
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
