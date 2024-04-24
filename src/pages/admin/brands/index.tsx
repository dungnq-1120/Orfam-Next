import React, { useState } from "react";
import useSWRMutation from "swr/mutation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";

import { useBrands } from "@/hooks/useBrand";

import AdminLayout from "@/components/layouts/AdminLayout";
import Admin from "@/pages/admin/index";

import { fetcherDelete, fetcherPatch, fetcherPost } from "@/services/callApiService";

import { Edit } from "@/icons/feature/Edit";

import { Button } from "@/shared/button";
import Modal from "@/shared/modal";
import { FormField, FormItem } from "@/shared/form";
import InputForm from "@/shared/input";

import isDefined from "@/utils/isDefine";
import showToast from "@/utils/showToast";

import bin from "@/image/icon/bin.svg";

interface TBrand {
  id: number;
  name: string;
}

const BrandInfo = z.object({
  name: z.string().min(1, "Please enter your brand").trim(),
});

const Brands = () => {
  const form = useForm({
    resolver: zodResolver(BrandInfo),
    defaultValues: {
      name: "",
    },
  });

  const formFields = [{ name: "name", placeholder: "Please enter your brand", label: "Brand" } as const];
  const [isOpenModalBrand, setIsOpenBrand] = useState<boolean>(false);
  const { brands, refreshBrand } = useBrands();

  const { trigger: addBrand } = useSWRMutation("/brands", fetcherPost);
  const { trigger: updateBrand } = useSWRMutation("/brands", fetcherPatch);
  const { trigger: deleteBrand } = useSWRMutation("/brands", fetcherDelete);

  const onSubmit = (data: { name: string }) => {
    if (brands) {
      const brand = brands.find((brand) => brand.name === data.name);
      if (!brand) {
        addBrand(data);
        showToast({
          message: `Add brand ${data.name} success`,
          type: "success",
        });
        form.reset();
        setIsOpenBrand(false);
        refreshBrand();
      } else {
        form.setError("name", {
          type: "manual",
          message: "This brand already exists.",
        });
      }
      form.reset({
        name: "",
      });
    }
  };
  const handleEditBrand = (brand: TBrand) => {
    updateBrand(brand);
    form.reset({
      name: brand.name,
    });
    setIsOpenBrand(true);
    refreshBrand();
  };

  const handleDeleteBrand = (brand: TBrand) => {
    deleteBrand(brand);
    refreshBrand();
    showToast({
      message: "Delete brand success",
      type: "warning",
    });
  };
  return (
    <>
      <div className="shadow-shadow2 p-3 bg-white sm:text-xs">
        <div className="flex justify-between items-center mb-10 xs:block">
          <h3 className="font-semibold text-blue-ct7 text-lg xs:text-sm ">MANAGER BRAND</h3>
          <Button
            onClick={() => {
              setIsOpenBrand(true);
            }}
            className="bg-blue-ct5 py-3 xs:mt-3 xs:w-full xs:text-xs"
          >
            ADD BRAND
          </Button>
        </div>
        <div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="border-b-1 border-slate-200 py-4 px-3 text-blue-ct5">ID</th>
                <th className="border-b-1 border-slate-200 py-4 px-3 text-blue-ct5">Brands</th>
                <th className="border-b-1 border-slate-200 py-4 px-3 text-blue-ct5">Action</th>
              </tr>
            </thead>
            <tbody>
              {isDefined(brands) &&
                brands.map((brand) => (
                  <tr key={brand.id} className="text-center">
                    <td className="border-slate-200 py-3 px-3 font-semibold text-green-500">{brand.id}</td>
                    <td className="border-slate-200 py-3 px-3 font-semibold text-orange-500">{brand.name}</td>
                    <td className="border-b-1 border-slate-200 py-3 px-3 font-semibold text-blue-ct7 flex-col items-center">
                      <div className="flex justify-center gap-2 items-center xs:block">
                        <Button
                          onClick={() => {
                            handleDeleteBrand(brand);
                          }}
                          className=" font-semibold p-3 mb-2 bg-red-300 shadow-lg sm:p-2"
                        >
                          <Image src={bin} alt="" className="w-6 h-6" />
                        </Button>
                        <Button
                          onClick={() => {
                            handleEditBrand(brand);
                          }}
                          className=" font-semibold p-3 mb-2 bg-green-200 shadow-lg sm:p-2"
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
      <Modal className="opacity-50" isOpenModal={isOpenModalBrand} onCancel={setIsOpenBrand}>
        <div className="bg-white w-[400px] p-3 rounded-md xs:w-[318px]">
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
                    {form?.formState?.errors[name] && form?.formState?.errors[name]?.message && (
                      <span className="text-red-500 text-start block text-xs">{form?.formState?.errors[name]?.message}</span>
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
                  setIsOpenBrand(false);
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

Brands.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AdminLayout>
      <Admin>{page}</Admin>
    </AdminLayout>
  );
};

export default Brands;
