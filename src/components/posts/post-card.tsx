import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Post } from "@/lib/types";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function PostCard({ post }: { post: Post }) {
  if (!post) return notFound();
  return (
    <Link href={`/posts/${post._id.toString()}`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">{post.title}</CardTitle>
          <CardDescription className="flex gap-2 text-sm">
            <p>CreatedAt :</p>
            <div>
              {post._id.getTimestamp().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              <span> - </span>
              {post._id.getTimestamp().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hourCycle: "h23",
              })}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{post.content}</p>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          <p>Author ID :{post.author.toString()}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
