import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCollection } from "@/lib/db";
import { Post } from "@/lib/types";
import { notFound } from "next/navigation";

export default async function Home() {
  const postsCollection = await getCollection("posts");

  if (!postsCollection) return notFound();
  const posts = (await postsCollection.find({}).toArray()) as Post[];

  console.log(posts);

  return (
    <div>
      <h1 className="title">Homepage</h1>
      <Table>
        <TableCaption>A list of your recent blogs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Author ID</TableHead>
            <TableHead className="text-right">CreateAt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post._id.toString()}>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.content}</TableCell>
              <TableCell>{post.author.toString()}</TableCell>
              <TableCell className="text-right">
                {post._id.getTimestamp().toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
