import React, { useState } from "react";
import logo from "@/image/logo/Logo.png";
import Image from "next/image";
import InputForm from "@/shared/input";
import { Button } from "@/shared/button";
import { Search } from "@/icons/info/Search";
import { User } from "@/icons/info/User";
import Dropdown from "@/shared/dropdown";

const Header = () => {
  const options = [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" },
  ];

  return (
    <>
      <nav className="p-5 flex items-center gap-10 shadow-shadow2 mb-3 bg-white justify-between">
        <Image src={logo} alt="" />
        <div className="flex gap-3 items-center">
          <span className="font-semibold text-blue-ct5"></span>

          <Dropdown className="absolute right-9 top-20" options={options}>
            <button className="rounded-full relative px-3 py-3 bg-red-200 md:hidden">
              <User className="w-5 h-5 text-blue-ct7" />
            </button>
          </Dropdown>
        </div>
      </nav>
    </>
  );
};

export default Header;
