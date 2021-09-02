import { PostEntity } from "../entities/post.entity";

export class CreateCommentDto {
  authorName: string;
  email: string;
  commentDate: Date;
  commentContent: string;
  post: PostEntity;
}
export class UpdateCommentDto {
  authorName: string;
  email: string;
  commentDate: Date;
  commentContent: string;
}