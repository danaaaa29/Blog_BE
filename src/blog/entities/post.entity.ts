import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostCommentEntity } from "./post-comment.entity";

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'title', length: 500 })
  title: string;

  @Column({name: 'sub_title', length: 500, nullable: true })
  subTitle: string;

  @Column({name: 'image_url', type:'text'})
  imageUrl: string;

  @Column({name: 'content', type:'text'})
  content: string;

  @Column({name: 'status', type:'boolean', default:true})
  isActive: boolean;

  @OneToMany(type => PostCommentEntity, comment => comment.post)
  comments: PostCommentEntity;
}
