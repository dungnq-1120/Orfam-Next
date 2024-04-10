import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";

import { useUser } from "@/hooks/useUser";
import { useProfile } from "@/hooks/useProfile";

import User from "..";
import PublicLayout from "@/components/layouts/publicLayout";
import { TFormBilling, TUser } from "@/components/features/checkout/type";

import { FormField, FormItem } from "@/shared/form";
import InputForm from "@/shared/input";
import { Button } from "@/shared/button";

import { fetcherPost, fetcherPut } from "@/services/callApiService";

import type { TProfile } from "@/services/type";

import showToast from "@/utils/showToast";

const userInfo = z.object({
  name: z.string().min(1, "Please enter your name").trim(),
  phone: z.string().min(1, "Please enter your phone").trim(),
  email: z.string().email(" Please enter invalid email format").trim(),
  address: z.string().min(1, "Please enter your address").trim(),
});

const Account = () => {
  const { user, refreshUser } = useUser<TUser>();
  const { profile, refreshProfile } = useProfile<TProfile[]>();
  const { trigger: addProfile, isMutating } = useSWRMutation("/profile", fetcherPost);
  const { trigger: updateProfile } = useSWRMutation("/profile", fetcherPut);

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

  const onSubmit = async (data: TFormBilling) => {
    if (user) {
      const profileIndex = profile?.findIndex((item) => item.userId === user.id);
      console.log(profileIndex);

      if (profileIndex === -1) {
        addProfile({ ...data, userId: user.id });
        showToast({
          message: "Updated account information successfully",
          type: "success",
        });
      } else {
        updateProfile({ ...data, userId: user.id });
        showToast({
          message: "Updated account information successfully",
          type: "success",
        });
      }
    }
    refreshProfile();
  };

  useEffect(() => {
    if (profile) {
      const profileIndex = profile.findIndex((item) => item.userId === user?.id);
      const profileData = profileIndex !== -1 ? profile[profileIndex] : null;
      form.reset({
        name: (profileData && profileData.name) || (user && user.name) || "",
        phone: (profileData && profileData.phone) || "",
        email: (profileData && profileData.email) || (user && user.email) || "",
        address: (profileData && profileData.address) || "",
      });
    }
  }, [user, profile]);

  return (
    <>
      <div className="manage-account text-center text-gray-700">
        <div className="manage-account text-center text-gray-700 p-4">
          <h4 className="text-green-ct5 font-semibold text-2xl">EDIT PROFILE</h4>
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
            <Button disabled={isMutating} type="submit" className="mt-5 w-full py-3">
              Save Change
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

Account.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <PublicLayout>
      <User>{page}</User>
    </PublicLayout>
  );
};

export default Account;
