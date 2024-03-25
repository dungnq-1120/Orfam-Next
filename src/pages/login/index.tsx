import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Form, FormField, FormItem, FormMessage } from "@/shared/form";
import InputForm from "@/shared/input";
import { Button } from "@/shared/button";
import Image from "next/image";
import logo from "@/image/logo/Logo.png";
import Checkbox from "@/shared/checkbox";
import authLocal from "@/utils/localStorage.utils";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";
import { fetcherPost } from "@/services/callApiService";
import { LoginData } from "./type";
import LoginLayout from "@/components/layouts/loginLayout";
import LoadingPage from "@/components/features/loading";

const loginSchema = z.object({
  email: z.string().email("Invalid email format").trim(),
  password: z
    .string()
    .regex(/^.{4,8}$/, "Password must be between 4 and 8 characters")
    .trim(),
});

const Login = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [errors, setErrors] = useState("");
  const { trigger } = useSWRMutation("/auth/login", fetcherPost);
  const { setInfo } = authLocal;
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    const token = (await trigger(data)) as TToken;
    
    if (token && token.access_token) {
      setInfo(token, "KEY_TOKEN");
      router.push("/");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setErrors("Incorrect email or password");
    }
  };

  const formFields = [{ name: "email", placeholder: "Email" } as const, { name: "password", placeholder: "Password", type: "password" } as const];

  return (
    <div className="login w-full h-screen flex justify-center items-center bg-slate-200 p-5 s:h-full xs:pt-4 xs:pb-4">
      <LoadingPage isLoading={isLoading} />
      <div className="form-Login flex justify-center items-center w-96 shadow-shadow1 bg-white rounded-lg p-6 sm:w-11/12 xs:w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="head-form mt-">
              <Image src={logo} alt="logo" className="m-auto" />
              <h3 className="text-center text-blue-ct6 font-bold text-4xl mb-2 mt-4 sm:text-3xl xs:text-2xl">Login</h3>
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
                      className="rounded-3xl bg-slate-100 border-0 mt-6 text-sm xs:text-xs"
                      placeholder={placeholder}
                      type={type || "text"}
                      {...field}
                    />
                    {(errors && name === "email") || (errors && name === "password") ? (
                      <FormMessage className="xs:text-xs">{errors}</FormMessage>
                    ) : (
                      <FormMessage className="xs:text-xs" />
                    )}
                  </FormItem>
                )}
              />
            ))}

            <div className="checkbox flex items-center justify-between mt-6 mb-6 gap-2">
              <div className="flex items-center gap-2">
                <Checkbox />
                <p className="text-sm text-blue-ct7 font-medium sm:text-xs">Remember me</p>
              </div>
              <p className="text-sm text-blue-ct7 font-medium duration-500 cursor-pointer hover:text-green-ct5 xs:text-xs">Forgot password ?</p>
            </div>
            <div className="flex justify-end">
              <Button className=" px-16 py-3 mt-4 w-full xs:text-xs" type="submit">
                LOGIN
              </Button>
            </div>
            <Link className="text-xs text-end block mt-3 text-blue-ct6 hover:text-blue-ct5 font-medium" href="/register">
              Not registered? Create an account
            </Link>
          </form>
        </Form>
      </div>
    </div>
  );
};

Login.getLayout = function getLayout(page: React.ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default Login;
