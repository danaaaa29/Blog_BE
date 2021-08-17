import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { PostEntity } from "./post.entity";


@Entity('post_comment')
export class PostCommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'comment_count'})
  commentCount: number;

  @Column({name: 'comment_author'})
  commentAuthor: string;

  @Column({name: 'comment_date', type: 'date'})
  commentDate: Date;

  @Column({name: 'comment_content', type: 'text'})
  commentContent: string;

  @Column({name: 'status', type:'boolean', default:true})
  isActive: boolean;

  @ManyToOne(type => PostEntity, post => post.comments )
  @JoinColumn({name: 'post_id'})
  post: PostEntity;

}
