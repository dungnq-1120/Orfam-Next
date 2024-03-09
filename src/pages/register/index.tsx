import PublicLayout from "@/components/layouts/publicLayout";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/shared/form";
import InputForm from "@/shared/input";
import { Button } from "@/shared/button";
import { TForm } from "@/shared/form/type";
import Image from "next/image";
import logo from "../../../public/image/logo/Logo.png";
import { Checkbox } from "@/shared/checkbox";
import Link from "next/link";
const registerSchema = z.object({
  name: z.string().min(1, "Please enter name").trim(),
  email: z
    .string()
    .min(1, "Please enter email")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email")
    .trim(),
  password: z
    .string()
    .min(1, "Please enter password")
    .regex(/^.{4,8}$/, "Invalid password")
    .trim(),
  confirmPassword: z.string().min(1, "Please confirm password"),
});

const Register = () => {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: TForm) => console.log(data);

  const formFields = [
    { name: "name", placeholder: "Name" } as const,
    { name: "email", placeholder: "Email" } as const,
    { name: "password", placeholder: "Password", type: "password" } as const,
    { name: "confirmPassword", placeholder: "Confirm password", type: "password" } as const,
  ];

  
  return (
    <div className="register w-screen h-screen flex justify-center items-center bg-slate-200 p-5 s:h-full xs:pt-4 xs:pb-4">
      <div className="form-register flex justify-center items-center max-w-lg shadow-shadow1 bg-white rounded-lg p-6 sm:w-11/12 xs:w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
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
                    <FormMessage className="xs:text-xs" />
                  </FormItem>
                )}
              />
            ))}
            <div className="checkbox ">
              <div className="flex mt-4 gap-2 ">
                <Checkbox />
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
  return <PublicLayout>{page}</PublicLayout>;
};

export default Register;
