import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PostService } from './services/post.service';
import { CreatePostDto, UpdatePostDto } from "./dto/post.dto";


@Controller('posts')
export class PostController {
  constructor(private postsService: PostService) {}

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.create(createPostDto);
  }

  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get('date')
  async findAllByDate() {
    return await this.postsService.findAllByDate();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePost: UpdatePostDto) {
    return await this.postsService.update(id,updatePost);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.postsService.remove(id);
  }
}
