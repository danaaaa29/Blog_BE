import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { PostCommentEntity } from "./post-comment.entity";


@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'title', length: 500 })
  title: string;

  @Column({name: 'sub_title', length: 500, nullable: true })
  subTitle: string;

  @Column({name: 'content', type:'text'})
  content: string;

  @Column({name:'number_of_likes', default: 0})
  likes: number;

  @CreateDateColumn({name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date;

  @BeforeUpdate()
  updateTimeStamp() {
    this.updatedAt = new Date;
  }

  @OneToMany(type => PostCommentEntity, comment => comment.post)
  comments: PostCommentEntity[];

}
