import React, { useEffect } from "react";

import AdminLayout from "@/components/layouts/AdminLayout";

import DashboardAdmin from "./dashboardAdmin";
import { useRouter } from "next/router";

const Admin = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    if (router.pathname === "/admin") {
      router.push("/admin/createProduct");
    }
  }, []);
  return (
    <div className="flex gap-2 pt-11 px-2 pb-10 mt-12 xss:block  ">
      <DashboardAdmin />
      <div className="w-3/4 xss:!w-full">{children}</div>
    </div>
  );
};

Admin.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Admin;
