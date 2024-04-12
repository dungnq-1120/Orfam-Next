import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PrivateLayout from "@/components/layouts/privateLayout";
import Admin from "..";

import { Button } from "@/shared/button";
import Modal from "@/shared/modal";
import { FormField, FormItem } from "@/shared/form";
import InputForm from "@/shared/input";

const userInfo = z.object({
  name: z.string().min(1, "Please enter your name").trim(),
  phone: z.string().min(1, "Please enter your phone").trim(),
  email: z.string().email(" Please enter invalid email format").trim(),
  address: z.string().min(1, "Please enter your address").trim(),
});

const Users = () => {
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);

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
    { name: "name", placeholder: "Please enter your name" } as const,
    { name: "phone", placeholder: "Please enter your phone" } as const,
    { name: "email", placeholder: "Please enter invalid email format" } as const,
    { name: "address", placeholder: "Please enter your address" } as const,
  ];

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <div className="shadow-shadow2">
        <h3 className="p-5 font-semibold text-blue-ct7 text-lg">USER ACCOUNTS</h3>
        <div className="overflow-x-auto">
          <table className="border-collapse border w-[110%] border-slate-500 lg:w-[200%] nm:w-[300%] xs:!w-[400%]">
            <thead>
              <tr>
                <th className="border border-slate-600 py-3">Name</th>
                <th className="border border-slate-600 py-3">Email</th>
                <th className="border border-slate-600 py-3">Phone</th>
                <th className="border border-slate-600 py-3">Address</th>
                <th className="border border-slate-600 py-3">Status</th>
                <th className="border border-slate-600 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center font-medium text-blue-ct6">
                <td className="border border-slate-600">Jack</td>
                <td className="border border-slate-600">Jack88@gmail.com</td>
                <td className="border border-slate-600">0998883473</td>
                <td className="border border-slate-600">HCM</td>
                <td className="border border-slate-600">Online</td>
                <td className="border border-slate-600 px-3 py-2 flex-col items-center">
                  <div className="flex flex-col items-center">
                    <Button className="block w-3/5 mb-2 py-3 bg-red-500">Delete</Button>
                    <Button
                      onClick={() => {
                        setIsOpenModalEdit(true);
                      }}
                      className="block w-3/5 py-3 bg-green-600"
                    >
                      Edit
                    </Button>
                  </div>
                </td>
              </tr>
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
                      className="border-1 mt-6 text-xs py-3 rounded-md font-medium"
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
    <PrivateLayout>
      <Admin>{page}</Admin>
    </PrivateLayout>
  );
};
export default Users;
