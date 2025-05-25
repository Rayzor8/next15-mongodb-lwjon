import type { WithId, Document, ObjectId } from "mongodb";

export interface Post extends WithId<Document> {
  title: string;
  content: string;
  author: ObjectId;
}
