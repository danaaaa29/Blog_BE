import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn, BeforeUpdate
} from "typeorm";
import { PostEntity } from "./post.entity";


@Entity('post_comment')
export class PostCommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'comment_author', type: 'varchar'})
  commentAuthor: string;

  @Column({name: 'comment_email', type: 'varchar'})
  commentEmail: string;

  @Column({name: 'comment_content', type: 'text'})
  commentContent: string;

  @CreateDateColumn({name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date;

  @BeforeUpdate()
  updateTimeStamp() {
    this.updatedAt = new Date;
  }

  @ManyToOne(type => PostEntity, post => post.comments)
  @JoinColumn({name: 'post_id'})
  post: PostEntity;
}
