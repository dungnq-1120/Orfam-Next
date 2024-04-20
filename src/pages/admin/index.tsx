import { ToastContainer } from "react-toastify";

import AdminLayout from "@/components/layouts/AdminLayout";

import DashboardAdmin from "./dashboardAdmin";

const Admin = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex px-2 xss:block  ">
      <ToastContainer />
      <DashboardAdmin />
      <div className="w-full ml-3 xss:!w-full">{children}</div>
    </div>
  );
};

Admin.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Admin;
