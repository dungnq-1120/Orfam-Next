import logo from "@/image/logo/Logo.png";
import { Button } from "@/shared/button";
import { Search } from "@/icons/info/Search";
import { User } from "@/icons/info/User";
import { CartIcon } from "@/icons/info/Cart";
import Image from "next/image";
import Link from "next/link";
import homeIcon from "@/image/icon/home.png";
import barsIcon from "@/image/icon/bars-3.png";
import cartIcon from "@/image/icon/cart.png";
import userIcon from "@/image/icon/user.png";
import { useState } from "react";
import ModalSearch from "@/components/features/modalSearch";

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <nav className="nav fixed top-0 w-full bg-white z-9999 flex justify-between items-center shadow-shadow1 h-20 pl-4 pr-5">
        <Image className="w-12 h-12 hidden md:block" src={barsIcon} alt="" />
        <div className="logo">
          <Image src={logo} alt="logo" />
        </div>
        <ul
          className="menu-page flex h-full md:hidden text-blue-ct7 text-sm"
        >
          <li className="px-3 h-full flex items-center font-semibold duration-500 hover:text-green-ct5">
            <Link href="/">HOME</Link>
          </li>
          <li className="px-3 h-full flex items-center font-semibold duration-500 hover:text-green-ct5">
            <Link href="/shop">SHOP</Link>
          </li>
          <li className="px-3 h-full flex items-center font-semibold duration-500 hover:text-green-ct5">
            <Link href="/blog">BLOG</Link>
          </li>
          <li className="px-3 h-full flex items-center font-semibold duration-500 hover:text-green-ct5">
            <Link href="/about">ABOUT US</Link>
          </li>
          <li className="px-3 h-full flex items-center font-semibold duration-500 hover:text-green-ct5">
            <Link href="/contact">CONTACT</Link>
          </li>
        </ul>
        <div className="list-option flex gap-2">
          <Button onClick={openModal} className="rounded-full px-3 py-3 bg-blue-200">
            <Search className="w-5 h-5 text-blue-ct7" />
          </Button>
          <Button types="error" className="rounded-full px-3 py-3 bg-red-200 md:hidden">
            <User className="w-5 h-5 text-blue-ct7" />
          </Button>
          <Button className="rounded-full px-3 py-3 bg-orange-ct2 md:hidden">
            <CartIcon className="w-5 h-5 text-blue-ct7" />
          </Button>
        </div>
      </nav>
      <nav className="nav fixed bottom-10 left-2/4 -translate-x-2/4 hidden shadow-shadow1 z-40 bg-white w-11/12 rounded-[30px] m-auto md:block ">
        <ul className="flex justify-between px-20 xs:px-10">
          <li className="cursor-pointer">
            <Image className="w-12 h-12" src={homeIcon} alt="" />
          </li>
          <li className="cursor-pointer">
            <Image className="w-12 h-12" src={barsIcon} alt="" />
          </li>
          <li className="cursor-pointer">
            <Image className="w-12 h-12" src={cartIcon} alt="" />
          </li>
          <li className="cursor-pointer">
            <Image className="w-12 h-12" src={userIcon} alt="" />
          </li>
        </ul>
      </nav>
      <ModalSearch setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};
