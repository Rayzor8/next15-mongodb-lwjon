"use server";

import { RegisterSchema } from "@/lib/validations";

export async function register(prevState: unknown, formData: FormData) {
  const validatedFields = RegisterSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email:formData.get("email"),
    };
  }

  console.log(validatedFields.data);
}
