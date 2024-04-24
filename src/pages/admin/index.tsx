import { ToastContainer } from "react-toastify";

import AdminLayout from "@/components/layouts/AdminLayout";

import DashboardAdmin from "./dashboardAdmin";

const Admin = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex px-2 ">
      <ToastContainer />
      <DashboardAdmin />
      <div className="w-11/12 lg:w-10/12 sm:!w-[74%]  ml-3">{children}</div>
    </div>
  );
};

Admin.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Admin;
