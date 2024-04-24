import React from "react";
import { ToastContainer } from "react-toastify";

import { useProfile } from "@/hooks/useProfile";

import PrivateLayout from "@/components/layouts/privateLayout";
import DashboardUser from "./dashboard";

import { TMyProfile } from "@/components/features/checkout/type";
import Loading from "@/components/features/loading";

const User = ({ children }: { children: React.ReactNode }) => {
  const { profile, isLoading } = useProfile<TMyProfile>();
  return (
    <>
      {<Loading isLoading={isLoading} />}
      <div className="flex gap-3 mt-20 pt-20 px-4 pb-16 sm:flex-wrap ">
        <ToastContainer />
        <div className="w-1/5 lg:w-2/5 sm:!w-full">
          <DashboardUser />
        </div>
        <div className="w-4/5 shadow-shadow2 rounded-lg lg:h-3/5 self-start sm:w-full">{children}</div>
      </div>
    </>
  );
};

User.getLayout = function getLayout(page: React.ReactElement) {
  return <PrivateLayout>{page}</PrivateLayout>;
};

export default User;
