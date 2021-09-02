import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { PostEntity } from "./post.entity";


@Entity('post_comment')
export class PostCommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'comment_author', type: 'varchar'})
  commentAuthor: string;

  @Column({name: 'comment_email', type: 'varchar'})
  commentEmail: string;

  @Column({name: 'comment_date', type: 'date'})
  commentDate: Date;

  @Column({name: 'comment_content', type: 'text'})
  commentContent: string;

  @ManyToOne(type => PostEntity, post => post.comments)
  @JoinColumn({name: 'post_id'})
  post: PostEntity;

}
