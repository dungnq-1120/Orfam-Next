import { ToastContainer } from "react-toastify";

import AdminLayout from "@/components/layouts/AdminLayout";

import DashboardAdmin from "./dashboardAdmin";

const Admin = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-2 pt-11 px-2 pb-10 mt-12 xss:block  ">
      <ToastContainer />
      <DashboardAdmin />
      <div className="w-3/4 xss:!w-full">{children}</div>
    </div>
  );
};

Admin.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Admin;
