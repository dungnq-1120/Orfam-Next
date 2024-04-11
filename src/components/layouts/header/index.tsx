import { useEffect, useState } from "react";
import Image from "next/image";

import { useCarts } from "@/hooks/useCart";
import { useRouter } from "next/router";

import ModalSearch from "@/components/features/modalSearch";

import { Button } from "@/shared/button";
import Modal from "@/shared/modal";
import { Search } from "@/icons/info/Search";
import { User } from "@/icons/info/User";
import { CartIcon } from "@/icons/info/Cart";

import { ApiResponseProductBrandAndCategory } from "@/services/type";

import authLocal from "@/utils/localStorage";
import isDefined from "@/utils/isDefine";

import logo from "@/image/logo/Logo.png";
import homeIcon from "@/image/icon/home.png";
import barsIcon from "@/image/icon/bars-3.png";
import cartIcon from "@/image/icon/cart.png";
import userIcon from "@/image/icon/user.png";
import Top from "@/icons/feature/Top";

export const Header = () => {
  const router = useRouter();
  const [isFixed, setIsFixed] = useState(false);
  const [isOpenModalSearch, setIsOpenModalSearch] = useState<boolean>(false);
  const [isOpenModalBars, setIsOpenModalBars] = useState<boolean>(false);
  const { removeInfo, getInfo } = authLocal;
  const [isOpenUser, setIsOpenUser] = useState<boolean>(false);
  const [token, setToken] = useState(null);
  const { carts } = useCarts<ApiResponseProductBrandAndCategory[]>();

  const menu: { [key: string]: string } = {
    HOME: "/",
    SHOP: "/shop",
    BLOG: "/blog",
    "ABOUT US": "/about",
    CONTACT: "/contact",
  };

  useEffect(() => {
    const token = getInfo("KEY_TOKEN");
    setToken(token);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`nav fixed w-full top-0 bg-white z-9999 flex justify-between items-center  h-20 pl-4 pr-5 ${
          isFixed && "animate-scroll shadow-shadow1"
        }`}
      >
        <div
          className="bg-gray-100 rounded-full hidden md:block"
          onClick={() => {
            setIsOpenModalBars(true);
          }}
        >
          <Image className="w-10 h-10 cursor-pointer" src={barsIcon} alt="" />
        </div>
        <div
          onClick={() => {
            router.push("/");
          }}
          className="logo cursor-pointer"
        >
          <Image src={logo} alt="logo" />
        </div>
        <ul className="menu-page flex h-full md:hidden text-blue-ct7 text-sm animate-accordion-up">
          {Object.keys(menu).map((label) => (
            <li
              onClick={() => router.push(menu[label])}
              key={label}
              className="px-3 cursor-pointer h-full flex items-center font-semibold duration-500 hover:text-green-ct5"
            >
              {label}
            </li>
          ))}
        </ul>
        <div className="list-option flex gap-2 relative">
          <Button
            onClick={() => {
              setIsOpenModalSearch(true);
            }}
            className="rounded-full px-3 py-3 bg-blue-200"
          >
            <Search className="w-5 h-5 text-blue-ct7" />
          </Button>
          <Button
            onClick={() => {
              setIsOpenUser(!isOpenUser);
            }}
            types="error"
            className="rounded-full px-3 py-3 bg-red-200 md:hidden"
          >
            <User className="w-5 h-5 text-blue-ct7" />
          </Button>
          {token ? (
            <ul className={`absolute right-0 bg-white shadow-xl top-16 text-blue-ct7 z-5xl w-52 ${isOpenUser ? "block" : "hidden"}`}>
              <li
                onClick={() => {
                  router.push("/user/account");
                }}
                className="p-3 border-1 cursor-pointer hover:text-green-600 text-center"
              >
                Account information
              </li>
              <li
                onClick={() => {
                  router.push("/user/order");
                }}
                className="p-3 border-1 cursor-pointer hover:text-green-600 text-center"
              >
                My order
              </li>
              <li className=" border-1 flex justify-center">
                <Button
                  onClick={() => {
                    removeInfo("KEY_TOKEN");
                    router.push("/login");
                  }}
                  className="w-full h-full text-blue-ct7  bg-transparent text-base cursor-pointer p-3 hover:text-red-600"
                >
                  Log out
                </Button>
              </li>
            </ul>
          ) : (
            <ul className={`absolute right-0 bg-white shadow-xl top-16 text-blue-ct7 z-5xl rounded-md w-52 ${isOpenUser ? "block" : "hidden"}`}>
              <li
                className=" border-1 flex justify-center w-full h-full text-blue-ct7  bg-transparent text-base cursor-pointer p-3 duration-500 rounded-md hover:bg-green-ct5 hover:text-white"
                onClick={() => {
                  removeInfo("KEY_TOKEN");
                  router.push("/login");
                }}
              >
                Log in
              </li>
            </ul>
          )}
          <Button onClick={() => router.push("/carts")} className="rounded-full px-3 py-3 bg-orange-ct2 md:hidden relative">
            <CartIcon className="w-5 h-5 text-blue-ct7" />
            <span className="absolute -right-1 -top-1 text-white bg-[#ff0000] w-5 h-5 flex justify-center items-center rounded-full text-md bg-">
              {isDefined(carts) && carts.length}
            </span>
          </Button>
        </div>
      </nav>
      <nav className="nav fixed bottom-10 left-2/4 -translate-x-2/4 hidden shadow-shadow1 z-40 bg-white w-11/12 rounded-[30px] m-auto md:block ">
        <ul className="flex justify-between px-20 xs:px-10">
          <li
            onClick={() => {
              router.push("/");
            }}
            className="cursor-pointer"
          >
            <Image className="w-12 h-12" src={homeIcon} alt="" />
          </li>
          <li
            onClick={() => {
              setIsOpenModalBars(true);
            }}
            className="cursor-pointer"
          >
            <Image className="w-12 h-12" src={barsIcon} alt="" />
          </li>
          <li
            onClick={() => {
              router.push("/carts");
            }}
            className="cursor-pointer relative"
          >
            <Image className="w-12 h-12" src={cartIcon} alt="" />
            <span className="absolute -right-1 top-1 text-white bg-[#ff0000] w-4 h-4 flex justify-center items-center rounded-full text-xs font-semibold bg-">
              {isDefined(carts) && carts.length}
            </span>
          </li>
          <li
            onClick={() => {
              router.push("/user");
            }}
            className="cursor-pointer"
          >
            <Image className="w-12 h-12" src={userIcon} alt="" />
          </li>
        </ul>
      </nav>
      <div>
        <Modal
          modalClass={`bg-white h-screen fixed left-0 w-72 p-3 duration-500 `}
          className="opacity-35"
          isOpenModal={isOpenModalBars}
          onCancel={setIsOpenModalBars}
        >
          <div>
            <Image className="m-auto pt-5" src={logo} alt="logo" />
            <ul className="mt-5">
              {Object.keys(menu).map((label) => (
                <li
                  onClick={() => {
                    router.push(menu[label]);
                    setIsOpenModalBars(false);
                  }}
                  key={label}
                  className={`px-3 py-4 mb-2 bg-gray-100 hover:shadow-shadow2 text-gray-800 text-xs hover:bg-blue-ct5 hover:text-white rounded-lg cursor-pointer h-full flex items-center font-semibold ${
                    router.pathname === menu[label] && "!bg-blue-ct5 !text-white "
                  }`}
                >
                  {label}
                </li>
              ))}
            </ul>
            <div className="border-t-2 border-black mt-5">
              <ul>
                <li
                  onClick={() => {
                    removeInfo("KEY_TOKEN");
                    router.push("/login");
                  }}
                  className="text-start px-3 mt-5 hover:bg-red-500 hover:shadow-shadow2 text-xs hover:text-white py-4 text-gray-800 font-semibold bg-gray-100 rounded-lg cursor-pointer"
                >
                  LOG OUT
                </li>
                <li
                  onClick={() => {
                    setIsOpenModalBars(false);
                  }}
                  className="text-center px-3 mt-5  bg-red-500 hover:shadow-shadow2 text-xs text-white py-4  font-semibold rounded-lg cursor-pointer"
                >
                  CLOSE
                </li>
              </ul>
            </div>
          </div>
        </Modal>
      </div>
      <ModalSearch setIsOpenModal={setIsOpenModalSearch} isOpenModal={isOpenModalSearch} />
      <Button
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        className={`fixed bottom-3 right-3 bg-green-ct6 px-3 py-3 rounded-full z-50 animate-scrollTop ${
          !isFixed && "!animate-scrollBottom opacity-0"
        }`}
      >
        <Top className="w-8 h-8 " />
      </Button>
    </>
  );
};
