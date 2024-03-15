import logo from "../../../../public/image/logo/Logo.png";
import { Button } from "@/shared/button";
import { Search } from "@/icons/info/Search";
import { User } from "@/icons/info/User";
import { CartIcon } from "@/icons/info/Cart";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  const menuList = ["HOME", "SHOP", "BLOG", "ABOUT US", "CONTACT"];

  return (
    <>
      <nav className="nav fixed top-0 w-full bg-white z-9999 flex justify-between items-center shadow-shadow1 h-20 pl-4 pr-5">
        <div className="logo">
          <Image src={logo} alt="logo" />
        </div>
        <ul className="menu-page flex h-full">
          {menuList.map((item) => (
            <li className="px-3 h-full flex items-center text-blue-ct7 text-sm font-semibold" key={item}>
              <Link href="">{item}</Link>
            </li>
          ))}
        </ul>
        <div className="list-option flex gap-2">
          <Button className="rounded-full px-3 py-3 bg-blue-200">
            <Search className="w-5 h-5 text-blue-ct7" />
          </Button>
          <Button types="error" className="rounded-full px-3 py-3 bg-red-200">
            <User className="w-5 h-5 text-blue-ct7" />
          </Button>
          <Button className="rounded-full px-3 py-3 bg-orange-ct2">
            <CartIcon className="w-5 h-5 text-blue-ct7" />
          </Button>
        </div>
      </nav>
    </>
  );
};
