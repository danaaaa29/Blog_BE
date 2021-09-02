import { PostCommentEntity } from "../entities/post-comment.entity";

export class CreatePostDto {
  title: string;
  subTitle: string;
  content: string;
  comments: PostCommentEntity[];
}
export class UpdatePostDto {
  title: string;
  subTitle: string;
  content: string;
}
