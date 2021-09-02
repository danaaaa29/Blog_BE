import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PostCommentService } from "../services/post-comment.service";
import { CreateCommentDto, UpdateCommentDto } from "../dto/comment.dto";


@Controller('posts-comment')
export class PostCommentController {
  constructor(private postsComService: PostCommentService) {}

  @Post()
  async createComment(@Body() comment: CreateCommentDto) {
    return await this.postsComService.create(comment);
  }

  @Get()
  async findAllComments() {
    return await this.postsComService.findAll();
  }

  @Get(':id')
  async findCommentForPost(@Param('id') commentId: number) {
    return await this.postsComService.findCommentForPost(commentId);
  }

  @Put(':id')
  async updateComment(@Param('id') commentId: number, @Body() updateCom: UpdateCommentDto) {
    return await this.postsComService.updateComment(commentId,updateCom);
  }

  @Delete(':id')
  async deleteComment(@Param('id') commentId: number) {
    return await this.postsComService.removeComment(commentId);
  }
}