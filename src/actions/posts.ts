"use server";

import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/get-auth-user";
import { BlogSchema } from "@/lib/validations";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export async function createPost(prevState: unknown, formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");

  // check is user is logged in
  const user = await getAuthUser();
  if (!user) return redirect("/");
  console.log(user);

  // validate form fields
  const validatedFields = BlogSchema.safeParse({ title, content });

  if (!validatedFields.success)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      title,
      content,
    };

  // if no errors, create post

  try {
    const postsCollection = await getCollection("posts");

    if (!postsCollection)
      return {
        errors: {
          title: ["Posts collection not found"],
          content: [],
        },
        title,
        content,
      };

    const post = {
      title: validatedFields.data.title,
      content: validatedFields.data.content,
      author: ObjectId.createFromHexString(user.userId as string),
    };

    await postsCollection.insertOne(post);
  } catch (error) {
    console.error(error);
  }

  redirect("/dashboard");
}
