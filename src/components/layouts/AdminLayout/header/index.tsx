import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { User } from "@/icons/info/User";
import Dropdown from "@/shared/dropdown";

import logo from "@/image/logo/Logo.png";

const Header = () => {
  const router = useRouter();
  const handleGoProfile = () => {
    router.push("/user");
  };
  const options = [{ id: 1, name: "My Profile", link: "/user/account", action: handleGoProfile }];

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
