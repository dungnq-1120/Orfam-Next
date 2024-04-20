import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Admin from "..";
import AdminLayout from "@/components/layouts/AdminLayout";

import { Button } from "@/shared/button";
import Modal from "@/shared/modal";
import { FormField, FormItem } from "@/shared/form";
import InputForm from "@/shared/input";
import { useUsers } from "@/hooks/useUsers";
import { TUserInfo } from "@/components/features/checkout/type";
import Image from "next/image";
import { Edit } from "@/icons/feature/Edit";
import bin from "@/image/icon/bin.svg";
import isDefined from "@/utils/isDefine";
import useSWRMutation from "swr/mutation";
import { fetcherDelete, fetcherPatch, fetcherPost } from "@/services/callApiService";

import showToast from "@/utils/showToast";
import { useCartsUser } from "@/hooks/useCartUsers";
import { useCarts } from "@/hooks/useCart";
import { TCartsUser } from "@/services/type";

const userInfo = z.object({
  name: z.string().min(1, "Please enter your user").trim(),
  phone: z.string().min(1, "Please enter your phone").trim(),
  email: z.string().email(" Please enter invalid email format").trim(),
  address: z.string().min(1, "Please enter your address").trim(),
});

interface TUserInfoUpdate {
  name: string;
  phone: string;
  email: string;
  address: string;
}

const Users = () => {
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
  const [user, setUser] = useState<TUserInfo | null>(null);
  const form = useForm({
    resolver: zodResolver(userInfo),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
  });

  const formFields = [
    { name: "name", placeholder: "Please enter your user" } as const,
    { name: "email", placeholder: "Please enter invalid email format" } as const,
    { name: "phone", placeholder: "Please enter your phone" } as const,
    { name: "address", placeholder: "Please enter your address" } as const,
  ];

  const tableNameHeading = ["User", "Email", "Phone", "Address", "Status", "Action"];
  const { users, refreshUsers } = useUsers<TUserInfo[]>();
  const { userCarts } = useCartsUser<TCartsUser[]>();
  const { trigger: updateUserCarts } = useSWRMutation("/userCarts", fetcherPatch);
  const { trigger: updateInfoUser } = useSWRMutation("/auth/users", fetcherPatch);
  const { trigger: deleteUser } = useSWRMutation("/auth/users", fetcherDelete);

  const onSubmit = (data: TUserInfoUpdate) => {
    const userCart = userCarts?.find((userCart) => userCart.name === user?.name);
    if (userCart) {
      const newUserCart = { ...userCart, name: data.name };
      updateUserCarts(newUserCart);
    }
    if (user) {
      const newData = { ...data, id: user.id };
      updateInfoUser(newData);
    }
    refreshUsers();
    setIsOpenModalEdit(false);
    showToast({
      message: "Update user success",
      type: "success",
    });
  };

  const handleEditUser = (user: TUserInfo) => {
    form.reset({
      name: user.name,
      email: user.email ? user.email : "",
      phone: user.phone ? user.phone : "",
      address: user.address ? user.address : "",
    });
    setUser(user);
    setIsOpenModalEdit(true);
  };

  const handelDeleteUser = (user: TUserInfo) => {
    deleteUser(user);
    refreshUsers();
    showToast({
      message: `Successfully deleted ${user.name} user`,
      type: "success",
    });
  };

  return (
    <>
      <div className="shadow-shadow2 bg-white rounded-lg">
        <h3 className="p-5 font-semibold text-blue-ct7 text-lg">USER ACCOUNTS</h3>
        <div className="overflow-x-auto">
          <table className="bg-white w-[110%] border-slate-500 lg:w-[200%] nm:w-[300%] xs:!w-[400%]">
            <thead>
              <tr>
                {tableNameHeading.map((item) => (
                  <th key={item} className="border-b-1 border-slate-200 py-4 px-3 text-blue-ct5">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isDefined(users) &&
                users.map((user) => (
                  <tr key={user.id} className="text-center font-medium text-blue-ct6 text-sm ">
                    <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-green-500">{user.name}</td>
                    <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-orange-500">{user.email}</td>
                    <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-yellow-500">
                      {user.phone ? user.phone : "No information"}
                    </td>
                    <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-blue-ct7">
                      {user.address ? user.address : "No information"}
                    </td>
                    <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-blue-ct7">
                      <span className="p-2 bg-[#00ff2a] opacity-80 rounded text-xs text-white">Online</span>
                    </td>
                    <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-blue-ct7 flex-col items-center">
                      <div className="flex flex-col items-center">
                        <Button
                          onClick={() => {
                            handelDeleteUser(user);
                          }}
                          className="w-28 font-semibold py-3 mb-2 bg-red-300 shadow-lg "
                        >
                          <Image src={bin} alt="" className="w-6 h-6" />
                        </Button>
                        <Button
                          onClick={() => {
                            handleEditUser(user);
                          }}
                          className="w-28 font-semibold py-3 mb-2  bg-green-200 shadow-lg "
                        >
                          <Edit className="w-6 h-6" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal className="opacity-40" isOpenModal={isOpenModalEdit} onCancel={setIsOpenModalEdit}>
        <div className="bg-white rounded-md w-[400px] p-4">
          <h3 className="font-semibold text-xl text-green-ct5">EDIT PROFILE</h3>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {formFields.map(({ name, placeholder }) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <label className="text-start text-xs text-blue-ct7 font-semibold block mt-4">Your {name}</label>
                    <InputForm
                      types="success"
                      fullWidth
                      className="border-1 mt-6 text-xs py-3 text-blue-ct7 rounded-md font-medium"
                      placeholder={placeholder}
                      {...field}
                    />
                    {form.formState.errors[name] && (
                      <span className="text-red-500 text-start block text-xs">{form.formState.errors[name].message}</span>
                    )}
                  </FormItem>
                )}
              />
            ))}
            <div className="flex justify-end gap-2 mt-3">
              <Button type="submit" className="bg-green-600">
                Submit
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setIsOpenModalEdit(false);
                }}
                className="bg-red-500"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
Users.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AdminLayout>
      <Admin>{page}</Admin>
    </AdminLayout>
  );
};
export default Users;
