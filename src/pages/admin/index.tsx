import React from "react";

import PrivateLayout from "@/components/layouts/privateLayout";

import DashboardAdmin from "./dashboardAdmin";

const Admin = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-2 pt-11 px-2 pb-10 mt-12 xss:block  ">
      <DashboardAdmin />
      <div className="w-3/4 xss:!w-full">{children}</div>
    </div>
  );
};

Admin.getLayout = function getLayout(page: React.ReactElement) {
  return <PrivateLayout>{page}</PrivateLayout>;
};

export default Admin;
