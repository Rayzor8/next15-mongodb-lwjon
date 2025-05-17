"use server";

import { getCollection } from "@/lib/db";
import { createSession } from "@/lib/session";
import { RegisterSchema } from "@/lib/validations";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function register(prevState: unknown, formData: FormData) {
  // Check if form data is valid
  const validatedFields = RegisterSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  const { email, password } = validatedFields.data;

  const userCollection = await getCollection("users");

  if (!userCollection)
    return {
      errors: {
        email: ["User collection not found"],
        password: [],
        confirmPassword: [],
      },
    };

  // Check if user already exists
  const existingUser = await userCollection.findOne({ email });

  if (existingUser)
    return {
      errors: {
        email: ["User already exists"],
        password: [],
        confirmPassword: [],
      },
    };

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const results = await userCollection.insertOne({
    email,
    password: hashedPassword,
  });

  console.log(results);

  // Create session
  await createSession(results.insertedId.toString());
  redirect("/dashboard");
}

export async function login(prevState: unknown, formData: FormData) {
  console.log(formData.get("email"));
}
