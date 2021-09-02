import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostCommentEntity } from "../entities/post-comment.entity";
import { Repository } from "typeorm";
import { CreateCommentDto, UpdateCommentDto } from "../dto/comment.dto";


@Injectable()
export class PostCommentService {

  constructor(
    @InjectRepository(PostCommentEntity) private postsComRepository: Repository<PostCommentEntity>,
  ) {}

  async create(comment: CreateCommentDto): Promise<PostCommentEntity> {
    return this.postsComRepository.save(comment);
  }

  async findAll(): Promise<PostCommentEntity[]> {
    return this.postsComRepository.find({relations: ['post']});
  }

  async findCommentForPost(commentId: number): Promise<PostCommentEntity> {
    return this.postsComRepository.findOne(commentId);
  }

  async updateComment(id: number, updateCom: UpdateCommentDto): Promise<PostCommentEntity> {
    await this.postsComRepository.update(id, updateCom);
    const updatedCom = await this.postsComRepository.findOne(id);
    if (updatedCom) {
      return updatedCom;
    }
    throw new NotFoundException(id);
  }

  async removeComment(id: number) {
    const comment = await this.findCommentForPost(id);

    if (!comment) {
      throw new NotFoundException(`Comment with ID=${id} not found`);
    }

    return this.postsComRepository.remove(comment);
  }
}