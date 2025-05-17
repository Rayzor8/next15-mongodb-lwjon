"use server";

import { getCollection } from "@/lib/db";
import { createSession } from "@/lib/session";
import { LoginSchema, RegisterSchema } from "@/lib/validations";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
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
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  const { email, password } = validatedFields.data;

  const userCollection = await getCollection("users");

  // check if collection exists
  if (!userCollection)
    return {
      errors: {
        email: ["DB collection not found"],
        password: [],
      },
    };

  // check if email exist
  const existingUser = await userCollection.findOne({ email });

  if (!existingUser) {
    return {
      errors: {
        email: ["User not found"],
        password: [],
      },
    };
  }

  // check if password is correct
  const mactchedPassword = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!mactchedPassword) {
    return {
      email,
      errors: {
        email: [],
        password: ["Incorrect password"],
      },
    };
  }

  console.log(existingUser);
  // create session
  await createSession(existingUser._id.toString());
  redirect("/dashboard");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("user_session");
  redirect("/");
}
