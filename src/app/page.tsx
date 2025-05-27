
import PostCard from "@/components/posts/post-card";
import { getCollection } from "@/lib/db";
import { Post } from "@/lib/types";
import { notFound } from "next/navigation";

export default async function Home() {
  const postsCollection = await getCollection("posts");

  if (!postsCollection) return notFound();
  
  const posts = (await postsCollection
    .find({})
    .sort({ _id: -1 })
    .toArray()) as Post[];

  return (
    <div>
      <h1 className="title">Homepage</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post._id.toString()} post={post} />
        ))}
      </div>
    </div>
  );
}
