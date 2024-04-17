import AdminLayout from "@/components/layouts/AdminLayout";
import React, { useState } from "react";
import Admin from "..";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormField, FormItem } from "@/shared/form";
import InputForm from "@/shared/input";
import { Button } from "@/shared/button";
import { TCodeDiscount, TDiscount } from "@/services/type";
import useSWRMutation from "swr/mutation";
import { fetcherDelete, fetcherPatch, fetcherPost } from "@/services/callApiService";
import { useDiscounts } from "@/hooks/useDiscount";
import isDefined from "@/utils/isDefine";
import showToast from "@/utils/showToast";

const DiscountInfo = z.object({
  name: z.string().min(1, "Please enter your name discount").trim(),
  discount: z.string().min(1, "Please enter your discount").trim(),
});

const Discount = () => {
  const form = useForm({
    resolver: zodResolver(DiscountInfo),
    defaultValues: {
      name: "",
      discount: "",
    },
  });

  const formFields = [
    { name: "name", placeholder: "Please enter name discount code", label: "Name code" } as const,
    { name: "discount", placeholder: "Please enter discount", label: "Discount" } as const,
  ];

  const [isEditDiscount, setIsEditDiscount] = useState<boolean>(false);
  const [idDiscountEdit, setIdDiscountEdit] = useState<number>(0);

  const { discounts, refreshDiscounts } = useDiscounts<TCodeDiscount[]>();
  const { trigger: addDiscountCode, isMutating } = useSWRMutation("/discountCodes", fetcherPost);
  const { trigger: updateDiscountCode } = useSWRMutation("/discountCodes", fetcherPatch);
  const { trigger: deleteDiscountCode } = useSWRMutation("/discountCodes", fetcherDelete);

  const onSubmit = (data: TDiscount) => {
    const codeDiscount = discounts?.find((item) => item.name === data.name);

    if (!isEditDiscount && !codeDiscount) {
      addDiscountCode(data);
      refreshDiscounts();
      setIsEditDiscount(false);
      showToast({
        message: "Discount code added successfully",
        type: "success",
      });
    }
    if (isEditDiscount && codeDiscount && codeDiscount.id === idDiscountEdit) {
      updateDiscountCode({ ...data, id: idDiscountEdit });
      refreshDiscounts();
      setIsEditDiscount(false);
      showToast({
        message: "Discount code updated successfully",
        type: "success",
      });
    } else {
      setIsEditDiscount(false);
      showToast({
        message: "Discount code updated successfully",
        type: "error",
      });
    }

    form.reset({
      name: "",
      discount: "",
    });
  };

  const handleEditDiscount = (discount: TCodeDiscount) => {
    setIsEditDiscount(true);
    setIdDiscountEdit(discount.id);
    form.reset({
      name: discount.name,
      discount: discount.discount,
    });
  };

  const handleDeleteDiscount = (discount: TCodeDiscount) => {
    deleteDiscountCode(discount);
    refreshDiscounts();
  };
  return (
    <>
      <div className="shadow-shadow2 p-3">
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
          {!isEditDiscount ? (
            <Button disabled={isMutating} className="w-full mt-5 py-3 font-semibold">
              CREATE
            </Button>
          ) : (
            <Button disabled={isMutating} className="w-full mt-5 py-3 font-semibold">
              APPLY EDIT
            </Button>
          )}
        </form>
      </div>
      <div className="shadow-shadow2 p-3 mt-8">
        <h3 className="font-semibold text-blue-ct7 mb-5">LIST OF DISCOUNT CODES</h3>
        <div className="overflow-auto h-72">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-blue-ct5">
                <th className="border border-slate-600 py-3 px-3 font-semibold text-blue-ct5">Name</th>
                <th className="border border-slate-600 py-3 px-3 font-semibold text-blue-ct5">Generated Code</th>
                <th className="border border-slate-600 py-3 px-3 font-semibold text-blue-ct5">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {isDefined(discounts) &&
                discounts.map((discount) => (
                  <tr key={discount.id}>
                    <td className="border w-2/6 border-slate-600 py-3 px-3 font-semibold text-green-500">{discount.name}</td>
                    <td className="border w-2/6 border-slate-600 py-3 px-3 font-semibold text-blue-ct7">{discount.discount}</td>
                    <td className="border w-2/6 border-slate-600 py-3 px-3 font-semibold text-blue-ct7">
                      <div className="flex justify-center items-center gap-2 xs:block">
                        <Button onClick={() => handleEditDiscount(discount)} className="bg-green-500 w-28 py-3 font-semibold mdd:w-20 mdd:py-2 mdd:text-xs xs:mb-2">
                          EDIT
                        </Button>
                        <Button onClick={() => handleDeleteDiscount(discount)} className="bg-red-500 w-28 py-3 font-semibold mdd:w-20 mdd:py-2 mdd:text-xs">
                          DELETE
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
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
