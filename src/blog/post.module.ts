import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { PostController } from "./controllers/post.controller";
import { PostService } from "./services/post.service";
import { PostCommentController } from "./controllers/post-comment.controller";
import { PostCommentService } from "./services/post-comment.service";
import { PostCommentEntity } from "./entities/post-comment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, PostCommentEntity])],
  controllers: [PostController, PostCommentController],
  providers: [PostService, PostCommentService]
})

export class PostModule {}
