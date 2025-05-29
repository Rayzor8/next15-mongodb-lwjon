"use server";

import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/get-auth-user";
import { BlogSchema } from "@/lib/validations";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

const validateFormData = (formData: FormData) => {
  const title = formData.get("title");
  const content = formData.get("content");

  const validated = BlogSchema.safeParse({ title, content });
  return {
    validated,
    title,
    content,
  };
};

const getPostsCollectionOrError = async () => {
  const postsCollection = await getCollection("posts");
  if (!postsCollection) {
    return {
      error: {
        title: ["Posts collection not found"],
        content: [],
      },
    };
  }
  return { postsCollection };
};

export async function createPost(prevState: unknown, formData: FormData) {
  // check is user is logged in
  const user = await getAuthUser();
  if (!user) return redirect("/");

  // validate form fields
  const { validated, title, content } = validateFormData(formData);

  if (!validated.success)
    return {
      errors: validated.error.flatten().fieldErrors,
      title,
      content,
    };

  // if no errors, create post
  const { postsCollection, error } = await getPostsCollectionOrError();

  if (error) {
    return { errors: error, title, content };
  }

  try {
    await postsCollection.insertOne({
      title: validated.data.title,
      content: validated.data.content,
      author: new ObjectId(user.userId as string),
    });
  } catch (err) {
    console.error("Error creating post:", err);
  }

  redirect("/dashboard");
}

export async function updatePost(prevState: unknown, formData: FormData) {
  // check is user is logged in
  const user = await getAuthUser();
  if (!user) return redirect("/");

  // validate form fields

  const postId = formData.get("postId") as string;
  const { validated, title, content } = validateFormData(formData);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      title,
      content,
    };
  }

  // if no errors, find post belongs to user
  const { postsCollection, error } = await getPostsCollectionOrError();

  if (error) {
    return { errors: error, title, content };
  }

  const post = await postsCollection.findOne({ _id: new ObjectId(postId) });

  if (!post)
    return {
      errors: {
        title: ["Post not found"],
        content: [],
      },
      title,
      content,
    };

  // check if post belongs to user
  if (user.userId !== post.author.toString()) return redirect("/");

  // Update the post in DB
  try {
    await postsCollection.findOneAndUpdate(
      { _id: post._id },
      {
        $set: {
          title: validated.data.title,
          content: validated.data.content,
        },
      }
    );
  } catch (err) {
    console.error("Error updating post:", err);
  }

  redirect("/dashboard");
}

export async function deletePost() {
  console.log("deletePost: ");
}
