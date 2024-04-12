import React from "react";

import AdminLayout from "@/components/layouts/AdminLayout";

import Admin from "..";

const Revenue = () => {
  return (
    <div className="shadow-shadow2 p-3">
      <div className="overflow-x-auto">
        <table className="border-collapse border w-full border-slate-500 text-xs">
          <thead>
            <tr>
              <th className="border border-slate-600 py-3 px-3">Total Users</th>
              <th className="border border-slate-600 py-3 px-3">Total Orders</th>
              <th className="border border-slate-600 py-3 px-3">Best Seller</th>
              <th className="border border-slate-600 py-3 px-3">Total Revenue</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center font-semibold text-blue-ct7">
              <td className="border border-slate-600 py-3 px-3">12</td>
              <td className="border border-slate-600 py-3 px-3">5</td>
              <td className="border border-slate-600 py-3 px-3">Cherry Cherry vip pro</td>
              <td className="border border-slate-600 py-3 px-3">200.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

Revenue.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AdminLayout>
      <Admin>{page}</Admin>
    </AdminLayout>
  );
};

export default Revenue;
