import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { useProfile } from "@/hooks/useProfile";

import { Button } from "@/shared/button";

import type { TProfile } from "@/services/type";
import type { TMyProfile, TUser } from "@/components/features/checkout/type";

import userAvatar from "@/image/logo/favico.png";
import camera from "@/image/icon/camera.svg";

const DashboardUser = () => {
  const router = useRouter();
  const [avatar, setAvatar] = useState<File | null>(null);
  const inputAvatarRef = useRef<HTMLInputElement>(null);
  const { profile, refreshProfile } = useProfile<TMyProfile>();

  const dashboardUser = [
    {
      id: 1,
      content: "MY ACCOUNT",
      link: "/user/account",
    },
    {
      id: 2,
      content: "MY ORDER",
      link: "/user/order",
    },
  ];

  const [selectedItem, setSelectedItem] = useState(router.pathname);

  useEffect(() => {
    if (router.pathname === "/user") {
      router.push(dashboardUser[0].link);
    }
  }, [profile, selectedItem]);

  return (
    <div className="text-white">
      <div className="bg-blue-ct5 px-4 py-8 text-center rounded-lg">
        <div className="mb-5">
          <div
            onClick={() => {
              inputAvatarRef.current?.click();
            }}
            className="cursor-pointer relative group"
          >
            <Image
              className="w-14 h-14 border-2 border-yellow-100 rounded-full m-auto object-cover"
              src={avatar ? URL.createObjectURL(avatar) : userAvatar}
              alt="avatar"
              width={56}
              height={56}
            />

            <input
              className="hidden"
              ref={inputAvatarRef}
              onChange={(event) => {
                const file = event.target.files?.[0];
                file && setAvatar(file);
              }}
              type="file"
            />
            <div className="group-hover:bg-[#374151c6] opacity-0 group-hover:opacity-100 duration-500 inline-block p-4 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 absolute rounded-full">
              <Image className=" w-5 h-5 " src={camera} alt="" />
            </div>
          </div>
          <h4 className="my-1 font-semibold xs:text-sm">{profile && profile.data.name.toUpperCase()}</h4>
          <h6 className="text-sm xs:text-xs">Customer</h6>
        </div>
        <div>
          {dashboardUser.map((item) => (
            <Button
              onClick={() => {
                setSelectedItem(item.link);
                router.push(item.link);
              }}
              key={item.content}
              className={`border-1 border-white py-3 rounded-3xl my-3 w-full bg-transparent xs:text-xs ${
                router.pathname === item.link ? "bg-green-ct5 border-0" : ""
              }`}
            >
              {item.content}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
