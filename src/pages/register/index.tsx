import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import LoginLayout from "@/components/layouts/loginLayout";
import Loading from "@/components/features/loading";

import { Form, FormField, FormItem, FormMessage } from "@/shared/form";
import InputForm from "@/shared/input";
import Checkbox from "@/shared/checkbox";
import { Button } from "@/shared/button";
import { TFormRegister } from "@/shared/form/type";

import { fetcherPost } from "@/services/callApiService";
import authLocal from "@/utils/localStorage";

import logo from "@/image/logo/Logo.png";
import { ROLES } from "@/services/type";
import { useProfile } from "@/hooks/useProfile";
import { TMyProfile } from "@/components/features/checkout/type";

const registerSchema = z
  .object({
    name: z.string().min(1, "Please enter your name").trim(),
    email: z.string().email("Invalid email format").trim(),
    password: z
      .string()
      .regex(/^.{4,8}$/, "Password must be between 4 and 8 characters")
      .trim(),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    termsAccepted: z.boolean().refine((val) => val === true, "You must accept the terms and conditions."),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
      });
    }
  });

const Register = () => {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });
  const [emailErrorRegister, setEmailErrorRegister] = useState("");
  const router = useRouter();
  const { trigger: addUser, isMutating } = useSWRMutation("/auth/register", fetcherPost);
  const { trigger: addUserCarts } = useSWRMutation("/userCarts", fetcherPost);
  const { setInfo } = authLocal;

  const onSubmit = async (data: TFormRegister) => {
    const { termsAccepted, ...registerData } = data;
    const token = (await addUser({ ...registerData, role: ROLES.CUSTOMER })) as TToken;

    if (token && token.access_token) {
      setInfo(token, "KEY_TOKEN");
      addUserCarts({ name: registerData.name });
      router.push("/");
    } else {
      setEmailErrorRegister("Email already exists");
    }
  };

  const formFields = [
    { name: "name", placeholder: "Name" } as const,
    { name: "email", placeholder: "Email" } as const,
    { name: "password", placeholder: "Password", type: "password" } as const,
    { name: "confirmPassword", placeholder: "Confirm password", type: "password" } as const,
  ];

  return (
    <div className="register w-screen h-screen flex justify-center items-center bg-slate-200 p-5 s:h-full xs:pt-4 xs:pb-4">
      <Loading isLoading={isMutating} />
      <div className="form-register flex justify-center items-center max-w-lg shadow-shadow1 bg-white rounded-lg p-6 sm:w-11/12 xs:w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="head-form mt-">
              <Image src={logo} alt="logo" className="m-auto" />
              <h3 className="text-center text-blue-ct6 font-bold text-4xl mb-2 mt-4 sm:text-3xl xs:text-2xl">REGISTER</h3>
            </div>
            {formFields.map(({ name, placeholder, type }) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <InputForm
                      types="success"
                      fullWidth
                      className="rounded-3xl bg-slate-100 border-0 mt-4 text-sm xs:text-xs"
                      placeholder={placeholder}
                      type={type || "text"}
                      {...field}
                    />
                    {emailErrorRegister && name === "email" ? (
                      <FormMessage className="xs:text-xs">{emailErrorRegister}</FormMessage>
                    ) : (
                      <FormMessage className="xs:text-xs" />
                    )}
                  </FormItem>
                )}
              />
            ))}
            <div className="checkbox ">
              <div className="flex items-center mt-4 gap-2 ">
                <Checkbox {...form.register("termsAccepted")} types={form.formState.errors.termsAccepted ? "error" : "primary"} />
                <p className="text-sm text-blue-ct7 font-medium sm:text-xs">
                  By using this form you agree with the storage and handling of your data by this website.
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button className="px-16 w-full py-3 sm:w-full xs:text-xs" type="submit">
                CREATE AN ACCOUNT
              </Button>
            </div>
            <Link className="text-sm text-end block mt-3 text-blue-ct6 hover:text-blue-ct5 font-medium" href="/login">
              Have an account? Login Here
            </Link>
          </form>
        </Form>
      </div>
    </div>
  );
};

Register.getLayout = function getLayout(page: React.ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default Register;
