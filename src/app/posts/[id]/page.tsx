import PostCard from "@/components/posts/post-card";
import { getCollection } from "@/lib/db";
import { Post } from "@/lib/types";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import React from "react";

export default async function PostDetail({
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

  return <PostCard post={post}  />;
}
