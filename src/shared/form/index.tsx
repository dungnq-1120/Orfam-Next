import React from "react";
import Input from "../input";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TForm } from "./type";

const Forms = ({
  errors,
  registerParams,
  register,
  typeInput,
}: {
  errors?: FieldErrors<TForm>;
  registerParams?: keyof TForm;
  register?: UseFormRegister<TForm>;
  typeInput?: string;
}) => {
  return (
    <div className={`flex justify-between gap-2 form-${registerParams} w-2/4`}>
      <label className="block mb-3">{registerParams ? "" : registerParams}</label>
      <Input
        type={typeInput || "text"}
        className={errors && registerParams && errors[registerParams] ? "border-2 border-red-500 py-2" : ""}
        placeholder={`Enter ${registerParams ? "Value" : registerParams}`}
        size="sm"
        fullWidth
        {...(register && register(registerParams as keyof TForm))}
      />
      <span className="text-red-600 font-semibold">{errors && registerParams && errors[registerParams]?.message}</span>
    </div>
  );
};

export default Forms;
