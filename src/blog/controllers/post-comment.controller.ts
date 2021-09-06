import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PostCommentService } from "../services/post-comment.service";
import { CreateCommentDto, UpdateCommentDto } from "../dto/comment.dto";



@Controller('posts')
export class PostCommentController {
  constructor(private postsComService: PostCommentService) {}

  @Post('/:postId/comments')
  async createComment(@Body() comment: CreateCommentDto, @Param('postId') postId) {
    return await this.postsComService.create(postId,comment);
  }

  @Get('/:postId/comments')
  async findAllComments(@Param('postId') postId) {
    return await this.postsComService.findAll(postId);
  }

  @Get('/:postId/comments/:id')
  async findCommentForPost(@Param('postId') postId: number,@Param('id') commentId: number) {
    return await this.postsComService.findCommentForPost(postId, commentId);
  }

  @Put('/:postId/comments/:id')
  async updateComment(@Param('postId') postId: number, @Param('id') commentId: number, @Body() updateCom: UpdateCommentDto) {
    return await this.postsComService.updateComment(postId, commentId, updateCom);
  }

  @Delete('/:postId/comments/:id')
  async deleteComment(@Param('postId') postId: number, @Param('id') commentId: number) {
    return await this.postsComService.removeComment(postId, commentId);
  }
}