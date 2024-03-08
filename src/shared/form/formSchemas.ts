
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Please enter email").trim(),
  password: z.string().min(1, "Please enter password").trim(),
});

export const registerSchema = z.object({
  firstName: z.string().min(1, "Please enter firstName").trim(),
  lastName: z.string().min(1, "Please enter lastName").trim(),
  email: z.string().min(1, "Please enter email")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email").trim(),
  phone: z.string().min(1, "Please enter email").regex(/^[0-9]{10}$/, "Invalid phone").trim(),
});
// const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<TInput>({ resolver: zodResolver(formSchema) });
//   const onSubmit = (data: TInput) => console.log(data);