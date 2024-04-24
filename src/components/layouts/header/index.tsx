import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { useRouter } from "next/router";

import useGetCartsUser from "@/hooks/useGetCartsUser";

import ModalSearch from "@/components/features/modalSearch";

import { Button } from "@/shared/button";
import Modal from "@/shared/modal";
import { Search } from "@/icons/info/Search";
import { User } from "@/icons/info/User";
import { CartIcon } from "@/icons/info/Cart";

import { ROLES } from "@/services/type";

import { Logout } from "@/icons/feature/Logout";
import { Order } from "@/icons/feature/Order";
import { Home } from "@/icons/feature/Home";
import { Shop } from "@/icons/feature/Shop";
import { About } from "@/icons/feature/About";
import Contact from "@/icons/feature/Contact";
import Top from "@/icons/feature/Top";

import isDefined from "@/utils/isDefine";
import authLocal from "@/utils/localStorage";

import logo from "@/image/logo/Logo.png";
import homeIcon from "@/image/icon/home.png";
import barsIcon from "@/image/icon/bars-3.png";
import cartIcon from "@/image/icon/cart.png";
import userIcon from "@/image/icon/user.png";

export const Header = () => {
  const router = useRouter();
  const [isFixed, setIsFixed] = useState(false);
  const [isOpenModalSearch, setIsOpenModalSearch] = useState<boolean>(false);
  const [isOpenModalBars, setIsOpenModalBars] = useState<boolean>(false);
  const { removeInfo, getInfo } = authLocal;
  const [isOpenUser, setIsOpenUser] = useState<boolean>(false);
  const [token, setToken] = useState<TToken | null>(null);
  const { carts } = useGetCartsUser();

  const menuItems = [
    {
      text: "Home",
      route: "/",
      icon: <Home className="w-6 h-6" />,
    },
    {
      text: "Shop",
      route: "/shop",
      icon: <Shop className="w-5 h-5 " />,
    },
    {
      text: "Blog",
      route: "/blog",
      icon: <Order className="w-6 h-6" />,
    },
    {
      text: "About us",
      route: "/about",
      icon: <About className="w-5 h-5 ml-1" />,
    },
    {
      text: "Contact",
      route: "/contact",
      icon: <Contact className="w-6 h-6 -mt-2" />,
    },
  ];

  const menu: { [key: string]: string } = {
    HOME: "/",
    SHOP: "/shop",
    BLOG: "/blog",
    "ABOUT US": "/about",
    CONTACT: "/contact",
  };

  useEffect(() => {
    const token = getInfo("KEY_TOKEN") as TToken;
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

  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpenUser(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
                className="p-3 text-sm font-medium border-1 text-blue-ct7 cursor-pointer hover:text-green-600 text-center"
              >
                ACCOUNT
              </li>
              <li
                onClick={() => {
                  router.push("/user/order");
                }}
                className="p-3 border-1 font-medium text-blue-ct7 cursor-pointer text-sm hover:text-green-600 text-center"
              >
                MY ORDER
              </li>
              {isDefined(token) && token.role === ROLES.ADMIN && (
                <li className=" border-1 flex justify-center">
                  <Button
                    onClick={() => {
                      router.push("/admin");
                    }}
                    className="w-full text-sm h-full font-medium text-blue-ct7 bg-transparent cursor-pointer p-3 hover:text-green-600"
                  >
                    ADMIN
                  </Button>
                </li>
              )}
              <li className=" border-1 flex justify-center text-sm">
                <Button
                  onClick={() => {
                    removeInfo("KEY_TOKEN");
                    removeInfo("ROLE");
                    router.push("/login");
                  }}
                  className="w-full h-full text-blue-ct7 font-medium bg-transparent cursor-pointer p-3 hover:text-red-600"
                >
                  LOGOUT
                </Button>
              </li>
            </ul>
          ) : (
            <ul className={`absolute right-0 bg-white shadow-xl top-16 text-blue-ct7 z-5xl rounded-md w-52 ${isOpenUser ? "block" : "hidden"}`}>
              <li
                className=" border-1 flex justify-center w-full h-full text-blue-ct7  bg-transparent text-base cursor-pointer p-3 duration-500 rounded-md hover:bg-green-ct5 hover:text-white hover:border-0"
                onClick={() => {
                  removeInfo("KEY_TOKEN");
                  router.push("/login");
                }}
              >
                Login
              </li>
            </ul>
          )}
          <Button onClick={() => router.push("/carts")} className="rounded-full px-3 py-3 bg-orange-ct2 md:hidden relative">
            <CartIcon className="w-5 h-5 text-blue-ct7" />
            <span className="absolute -right-1 -top-1 text-white bg-[#ff0000] w-5 h-5 flex justify-center items-center rounded-full text-md bg-">
              {carts.length}
            </span>
          </Button>
        </div>
      </nav>
      {!router.pathname.startsWith("/admin") && (
        <nav className="nav fixed bottom-10 left-2/4 -translate-x-2/4 hidden shadow-shadow1 z-40 bg-white w-11/12 rounded-[30px] m-auto md:block ">
          <ul className="flex justify-between px-10 xs:px-5 xs:py-1">
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
                {carts.length}
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
      )}
      <div>
        <Modal
          modalClass={"overflow-y-auto fixed left-0 w-72 duration-500 bg-blue-ct7"}
          className="opacity-35"
          isOpenModal={isOpenModalBars}
          onCancel={setIsOpenModalBars}
        >
          <div className="flex w-full h-screen mb-4 flex-col justify-between rounded-lg">
            <div className="px-4 py-6">
              <h3 className="text-white text-center p-5  rounded-xl font-semibold">ORFARM</h3>
              <ul className="mt-6 space-y-6">
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      router.push(item.route);
                    }}
                    className={`flex text-sm items-center gap-4 rounded-lg hover:bg-green-ct5 hover:text-white px-4 py-4 font-medium text-gray-300 cursor-pointer ${
                      router.pathname === item.route && "bg-green-ct5 text-white shadow-shadow2 font-semibold"
                    }`}
                  >
                    <span>{item.icon}</span> <span>{item.text}</span>
                  </li>
                ))}
                <li className="border-t-1 border-white"></li>
                <li
                  onClick={() => {
                    removeInfo("KEY_TOKEN");
                    removeInfo("ROLE");
                    router.push("/login");
                  }}
                  className={`flex text-sm items-center  mt-10 gap-4 rounded-lg hover:bg-green-ct7 hover:text-white px-4 py-3 font-medium text-gray-300 cursor-pointer`}
                >
                  <span>
                    <Logout className="w-6 h-6" />
                  </span>
                  <span>Logout</span>
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
