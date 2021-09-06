import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostCommentEntity } from "../entities/post-comment.entity";
import { getRepository, Repository } from "typeorm";
import { CreateCommentDto, UpdateCommentDto } from "../dto/comment.dto";
import { PostEntity } from "../entities/post.entity";


@Injectable()
export class PostCommentService {

  constructor(
    @InjectRepository(PostCommentEntity) private postsComRepository: Repository<PostCommentEntity>,
  ) {}

  async create(postId: number, comment: CreateCommentDto): Promise<PostCommentEntity> {
    const post: PostEntity = await getRepository(PostEntity).findOne(postId);
    if (!post) {
      throw new NotFoundException(`Post with ID=${postId} not found`);
    }
    return this.postsComRepository.save(comment);
  }

  async findAll(postId: number): Promise<PostCommentEntity[]> {
    const post: PostEntity = await getRepository(PostEntity).findOne(postId);
    if (!post) {
      throw new NotFoundException(`Post with ID=${postId} not found`);
    }
    return this.postsComRepository.find({where: {post: post}});
  }

  async findCommentForPost(postId: number, commentId: number): Promise<PostCommentEntity> {
    const post: PostEntity = await getRepository(PostEntity).findOne(postId)
   if (!post) {
     throw new NotFoundException(`Post with ID=${postId} not found`);
   }
   if (!commentId) {
     throw new NotFoundException(`Comment with ID=${commentId} not found`);
   }
    return this.postsComRepository.findOne(commentId, {where: {post:post}});
  }

  async updateComment(postId: number, id: number, updateCom: UpdateCommentDto): Promise<PostCommentEntity> {
    const post: PostEntity = await getRepository(PostEntity).findOne(postId);
    if (!post) {
      throw new NotFoundException(`Post with ID=${postId} not found`);
    }
    await this.postsComRepository.update(id, updateCom);
    const updatedCom = await this.postsComRepository.findOne(id, {where: {post: post}});
    if (updatedCom) {
      return updatedCom;
    }
    throw new NotFoundException(id);
  }

  async removeComment(postId: number, id: number) {
    const comment = await this.findCommentForPost(postId, id);

    if (!comment) {
      throw new NotFoundException(`Comment with ID=${id} not found`);
    }
    return this.postsComRepository.remove(comment);
  }
}