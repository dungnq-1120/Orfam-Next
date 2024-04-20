import React, { useState } from "react";
import useSWRMutation from "swr/mutation";

import AdminLayout from "@/components/layouts/AdminLayout";

import Admin from "..";

import { Button } from "@/shared/button";

import { fetcherDelete, fetcherPatch, fetcherPost } from "@/services/callApiService";

import isDefined from "@/utils/isDefine";
import showToast from "@/utils/showToast";
import Image from "next/image";
import { Edit } from "@/icons/feature/Edit";
import bin from "@/image/icon/bin.svg";
import Modal from "@/shared/modal";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem } from "@/shared/form";
import InputForm from "@/shared/input";
import { useCategories } from "@/hooks/useCategories";

interface TCategories {
  id: number;
  name: string;
}

const categoriesInfo = z.object({
  name: z.string().min(1, "Please enter your categories").trim(),
});

const Categories = () => {
  const form = useForm({
    resolver: zodResolver(categoriesInfo),
    defaultValues: {
      name: "",
    },
  });

  const formFields = [{ name: "name", placeholder: "Please enter your categories", label: "categories" } as const];
  const [isOpenModalCategories, setIsOpenCategories] = useState<boolean>(false);
  const { categories, refreshCategories } = useCategories();

  const { trigger: addCategories } = useSWRMutation("/categories", fetcherPost);
  const { trigger: updateCategories } = useSWRMutation("/categories", fetcherPatch);
  const { trigger: deleteCategories } = useSWRMutation("/categories", fetcherDelete);

  const onSubmit = (data: { name: string }) => {
    if (categories) {
      const category = categories.find((categories) => categories.name === data.name);
      if (!category) {
        addCategories(data);
        showToast({
          message: `Add categories ${data.name} success`,
          type: "success",
        });
        form.reset();
        setIsOpenCategories(false);
        refreshCategories();
      } else {
        form.setError("name", {
          type: "manual",
          message: "This categories already exists.",
        });
      }
      form.reset({
        name: "",
      });
    }
  };
  const handleEditCategories = (categories: TCategories) => {
    updateCategories(categories);
    form.reset({
      name: categories.name,
    });
    setIsOpenCategories(true);
    refreshCategories();
  };

  const handleDeleteCategories = (categories: TCategories) => {
    deleteCategories(categories);
    refreshCategories();
    showToast({
      message: "Delete categories success",
      type: "warning",
    });
  };
  return (
    <>
      <div className="shadow-shadow2 p-3 bg-white">
        <div className="flex justify-between items-center mb-10">
          <h3 className="font-semibold text-blue-ct7 text-lg ">MANAGER CATEGORIES</h3>
          <Button
            onClick={() => {
              setIsOpenCategories(true);
            }}
            className="bg-blue-ct5 py-3"
          >
            ADD CATEGORIES
          </Button>
        </div>
        <div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="border-b-1 border-slate-200 py-4 px-3 text-blue-ct5">ID</th>
                <th className="border-b-1 border-slate-200 py-4 px-3 text-blue-ct5">Categories</th>
                <th className="border-b-1 border-slate-200 py-4 px-3 text-blue-ct5">Action</th>
              </tr>
            </thead>
            <tbody>
              {isDefined(categories) &&
                categories.map((categories) => (
                  <tr key={categories.id} className="text-center">
                    <td className="border-slate-200 py-3 px-3 font-semibold text-green-500">{categories.id}</td>
                    <td className="border-slate-200 py-3 px-3 font-semibold text-orange-500">{categories.name}</td>
                    <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-blue-ct7 flex-col items-center">
                      <div className="flex justify-center gap-2 items-center">
                        <Button
                          onClick={() => {
                            handleDeleteCategories(categories);
                          }}
                          className=" font-semibold p-3 mb-2 bg-red-300 shadow-lg "
                        >
                          <Image src={bin} alt="" className="w-6 h-6" />
                        </Button>
                        <Button
                          onClick={() => {
                            handleEditCategories(categories);
                          }}
                          className=" font-semibold p-3 mb-2  bg-green-200 shadow-lg "
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
      <Modal className="opacity-50" isOpenModal={isOpenModalCategories} onCancel={setIsOpenCategories}>
        <div className="bg-white w-[400px] p-3 rounded-md">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {formFields.map(({ name, placeholder, label }) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <label className="text-start text-xs text-blue-ct7 font-semibold block mt-4">Your {label}</label>
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
                  setIsOpenCategories(false);
                  form.reset({
                    name: "",
                  });
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

Categories.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AdminLayout>
      <Admin>{page}</Admin>
    </AdminLayout>
  );
};

export default Categories;
