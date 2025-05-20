import { createPost } from "@/actions/posts";
import BlogForm from "@/components/blog-form";

export default function CreatePost() {
  return (
    <div>
      <h1 className="title">Create Post</h1>
      <BlogForm handler={createPost}/>
    </div>
  );
}
