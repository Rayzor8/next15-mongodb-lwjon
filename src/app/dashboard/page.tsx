import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/get-auth-user";
import { Post } from "@/lib/types";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import { PostActionsDropdown } from "./post-actions-dropdown";

export default async function Dashboard() {
  const user = await getAuthUser();

  const postsCollection = await getCollection("posts");

  if (!postsCollection) return notFound();

  const userPosts = (await postsCollection
    .find({
      author: new ObjectId(user?.userId as string),
    })
    .sort({ _id: -1 })
    .toArray()) as Post[];

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Title</TableHead>
            <TableHead className="font-bold">Content</TableHead>
            <TableHead className="font-bold">Created At</TableHead>
            <TableHead className="w-[40px] font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userPosts.map((post) => (
            <TableRow key={post._id.toString()}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell className="max-w-[300px] truncate">
                {post.content}
              </TableCell>
              <TableCell>
                {post._id.getTimestamp().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell className="text-center">
                <PostActionsDropdown postId={post._id.toString()} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
