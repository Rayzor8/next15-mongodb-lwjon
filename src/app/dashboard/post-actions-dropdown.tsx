import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/actions/posts";

interface PostActionsDropdownProps {
  postId: string;
}

export function PostActionsDropdown({ postId }: PostActionsDropdownProps) {

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/posts/${postId}`} className="flex items-center">
            <Eye className="mr-2 h-4 w-4" />
            View
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/posts/edit/${postId}`} className="flex items-center">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <form action={deletePost}>
            <input type="hidden" name="postId" defaultValue={postId} />
            <button type="submit" className="flex items-center">
              {" "}
              <Trash2 className="mr-4 h-4 w-4 " />
              Delete
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
