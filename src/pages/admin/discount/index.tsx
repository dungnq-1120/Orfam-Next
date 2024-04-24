import AdminLayout from "@/components/layouts/AdminLayout";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import useSWRMutation from "swr/mutation";

import Admin from "@/pages/admin/index";

import { FormField, FormItem } from "@/shared/form";
import InputForm from "@/shared/input";
import { Button } from "@/shared/button";
import Modal from "@/shared/modal";

import { TCodeDiscount, TDiscount } from "@/services/type";

import { fetcherDelete, fetcherPatch, fetcherPost } from "@/services/callApiService";
import { useDiscounts } from "@/hooks/useDiscount";

import isDefined from "@/utils/isDefine";
import showToast from "@/utils/showToast";

import { Edit } from "@/icons/feature/Edit";

import bin from "@/image/icon/bin.svg";

const DiscountInfo = z.object({
  name: z.string().min(1, "Please enter your name name").trim(),
  sale: z.coerce.number().min(1, "Please enter your sale"),
  code: z.string().min(1, "Please enter your code").trim(),
});

const Discount = () => {
  const form = useForm({
    resolver: zodResolver(DiscountInfo),
    defaultValues: {
      name: "",
      sale: 0,
      code: "",
    },
  });

  const formFields = [
    { name: "name", placeholder: "Please enter name", label: "Name" } as const,
    { name: "sale", placeholder: "Please enter sale", label: "Sale" } as const,
    { name: "code", placeholder: "Please enter code", label: "Code" } as const,
  ];
  const [isOpenModalDiscount, setIsOpenModalDiscount] = useState<boolean>(false);

  const [idDiscountEdit, setIdDiscountEdit] = useState<number | null>(null);

  const { discount, refreshDiscounts } = useDiscounts<TCodeDiscount[]>({}, false);
  const { trigger: addDiscountCode, isMutating } = useSWRMutation("/discountCodes", fetcherPost);
  const { trigger: updateDiscountCode } = useSWRMutation("/discountCodes", fetcherPatch);
  const { trigger: deleteDiscountCode } = useSWRMutation("/discountCodes", fetcherDelete);

  const onSubmit = (data: TDiscount) => {
    const newData = { ...data, sale: data.sale / 100 };
    if (!idDiscountEdit) {
      addDiscountCode(newData);
      refreshDiscounts();
      setIsOpenModalDiscount(false);
      setIdDiscountEdit(null);
      showToast({
        message: "Discount code added successfully",
        type: "success",
      });
    }
    if (idDiscountEdit) {
      updateDiscountCode({ ...newData, id: idDiscountEdit });
      refreshDiscounts();
      setIsOpenModalDiscount(false);
      setIdDiscountEdit(null);
      showToast({
        message: "Discount code updated successfully",
        type: "success",
      });
    }

    form.reset({
      name: "",
      sale: 0,
      code: "",
    });
  };

  const handleEditDiscount = (discount: TCodeDiscount) => {
    setIsOpenModalDiscount(true);
    setIdDiscountEdit(discount.id);
    form.reset({
      name: discount.name,
      sale: discount.sale * 100,
      code: discount.code,
    });
  };

  const handleDeleteDiscount = async (discount: TCodeDiscount) => {
    await deleteDiscountCode(discount);
    refreshDiscounts();
    showToast({
      message: `Delete discount code ${discount.name} success`,
      type: "warning",
    });
  };
  return (
    <>
      <div className="shadow-shadow2 p-5 rounded-sm mt-8 bg-white sm:text-xs">
        <div className="flex justify-between items-center mb-10 csm:block">
          <h3 className="font-semibold text-blue-ct7 mb-5 text-lg xs:text-xs">MANAGER DISCOUNT CODES</h3>
          <Button
            onClick={() => {
              setIsOpenModalDiscount(true);
            }}
            className="bg-blue-ct5 py-3 csm:w-full xs:text-xs"
          >
            CREATE DISCOUNT CODE
          </Button>
        </div>
        <div className="xs:overflow-x-auto">
          <table className="w-full text-sm xs:!text-xs xs:w-[160%]">
            <thead>
              <tr className="text-blue-ct5">
                <th className="border-b-1 border-slate-200 py-4 px-3 text-blue-ct5">Name</th>
                <th className="border-b-1 border-slate-200 py-4 px-3 text-blue-ct5">Code</th>
                <th className="border-b-1 border-slate-200 py-4 px-3 text-blue-ct5">Sale</th>
                <th className="border-b-1 border-slate-200 py-4 px-3 text-blue-ct5">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {isDefined(discount) &&
                discount.map((discount) => (
                  <tr key={discount.id}>
                    <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-green-500">{discount.name}</td>
                    <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-blue-500">
                      <span className="px-2 py-1 bg-blue-200 rounded">{discount.code}</span>
                    </td>
                    <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-red-500">
                      <span className="px-2 py-1 bg-red-200 rounded">{discount.sale * 100}%</span>
                    </td>
                    <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold ">
                      <div className="flex gap-2 justify-center items-center xss:block">
                        <Button
                          onClick={() => {
                            handleDeleteDiscount(discount);
                          }}
                          className=" font-semibold p-3 mb-2 bg-red-300 shadow-lg sm:p-2"
                        >
                          <Image src={bin} alt="" className="w-6 h-6 xs:w-4 xs:h-4" />
                        </Button>
                        <Button
                          onClick={() => {
                            handleEditDiscount(discount);
                          }}
                          className=" font-semibold p-3 mb-2  bg-green-200 shadow-lg sm:p-2"
                        >
                          <Edit className="w-6 h-6 xs:w-4 xs:h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal className="opacity-50" isOpenModal={isOpenModalDiscount} onCancel={setIsOpenModalDiscount}>
        <div className="bg-white w-[500px] p-3 rounded xss:w-[410px] xs:!w-[310px]">
          <h3 className="font-semibold text-blue-ct7">CREATE DISCOUNT CODE</h3>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {formFields.map(({ name, placeholder, label }) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <label className="text-start text-xs text-blue-ct7 font-semibold block mt-4">{label}</label>
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
            {!idDiscountEdit ? (
              <Button disabled={isMutating} className="w-full mt-5 py-3 font-semibold">
                CREATE
              </Button>
            ) : (
              <>
                <Button disabled={isMutating} className="w-full mt-5 py-3 font-semibold">
                  APPLY
                </Button>
                <Button
                  onClick={() => {
                    setIsOpenModalDiscount(false);
                    setIdDiscountEdit(null);
                    form.reset({
                      name: "",
                      code: "",
                      sale: 0,
                    });
                  }}
                  disabled={isMutating}
                  className="w-full bg-red-500 mt-5 py-3 font-semibold"
                >
                  CANCEL
                </Button>
              </>
            )}
          </form>
        </div>
      </Modal>
    </>
  );
};
Discount.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AdminLayout>
      <Admin>{page}</Admin>
    </AdminLayout>
  );
};
export default Discount;
