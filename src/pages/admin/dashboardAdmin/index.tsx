import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import userAvatar from "@/image/logo/favico.png";

const DashboardAdmin = () => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState(router.pathname);
  const menuItems = [
    {
      text: "CREATE PRODUCT",
      route: "/admin/createProduct",
    },
    {
      text: "MANAGER USER ACCOUNTS",
      route: "/admin/users",
    },
    {
      text: "ORDER MANAGEMENT",
      route: "/admin/orders",
    },
    {
      text: "REVENUE MANAGEMENT",
      route: "/admin/revenue",
    },
  ];

  return (
    <>
      <div className="h-[460px] top-20 py-10 bg-blue-ct6  w-1/4 rounded-lg text-white px-2 self-start sticky xss:relative xss:top-0 xss:w-full xss:h-full xss:mb-10 xss:shadow-shadow2">
        <Image className="w-14 h-14 border-2 border-yellow-100 rounded-full m-auto object-cover lg:w-12 lg:h-12" src={userAvatar} alt="userAvatar" />
        <h3 className="text-center mt-2 font-semibold lg:text-xs">HIEN</h3>
        <h5 className="text-center font-medium mt-2 text-sm lg:text-xs">ADMIN</h5>
        <ul className="mt-5">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                router.push(item.route);
              }}
              className={`py-4 px-3 text-center text-xs font-semibold rounded-3xl border-1 border-white hover:bg-green-ct5 mt-4 cursor-pointer lg:py-3 sm:text-[10px] sm:rounded-md sm:!p-3 ${
                router.pathname === item.route && "bg-green-ct5"
              }`}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DashboardAdmin;
