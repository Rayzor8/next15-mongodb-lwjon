import { updatePost } from "@/actions/posts";
import BlogForm from "@/components/blog-form";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/get-auth-user";
import { Post } from "@/lib/types";
import { ObjectId } from "mongodb";
import { notFound, redirect } from "next/navigation";

export default async function EditPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id.length !== 24) return notFound();

  const postCollection = await getCollection("posts");
  const post = (await postCollection?.findOne({
    _id: new ObjectId(id),
  })) as Post;

  if (!post) return notFound();

  // protect page from unauthorized user
  const user = await getAuthUser();
  if (user?.userId !== post.author.toString()) return redirect("/");

  return (
    <div>
      <h1 className="title">Edit Post ID: {id}</h1>
      <BlogForm handler={updatePost} post={JSON.parse(JSON.stringify(post))} />
    </div>
  );
}
