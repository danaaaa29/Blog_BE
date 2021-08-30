import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { Repository } from "typeorm";
import { CreatePostDto, UpdatePostDto } from "../dto/post.dto";


@Injectable()
export class PostService {

  constructor(
    @InjectRepository(PostEntity) private postsRepository: Repository<PostEntity>,
  ) {}

  async create(createPost: CreatePostDto): Promise<PostEntity> {
    const post = await this.postsRepository.create(createPost);
    return this.postsRepository.save(post);
  }

  async findAll(): Promise<PostEntity[]> {
    return this.postsRepository.find();
  }

  async findAllByDate(): Promise<PostEntity[]> {
    const entries = this.postsRepository
      .createQueryBuilder()
      .addOrderBy('created_at', "ASC").getMany();

    return entries;
  }

  async findOne(id: string): Promise<PostEntity> {
    const post = await this.postsRepository.findOne(id);

    if (!post) {
      throw new NotFoundException(`Post with ID=${id} not found`);
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    const post = await this.postsRepository.preload({
      id: +id,
      ...updatePostDto,
    });
    if (!post) {
      throw new NotFoundException(`Post with ID=${id} not found`);
    }
    return this.postsRepository.save(post);
  }

  async remove(id: string){
    const post = await this.findOne(id);

    if (!post) {
      throw new NotFoundException(`Post with ID=${id} not found`);
    }

    return this.postsRepository.remove(post);
  }
}
