import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from 'src/posts/dts/create-post.dto';
import { PostsService } from 'src/posts/posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @ApiOperation({
    summary: '모든 게시물 조회',
  })
  @Get()
  getAllPosts() {
    return this.postService.getAllPost();
  }

  @ApiOperation({
    summary: '게시물 작성',
  })
  @Post()
  createPost(@Body() body: CreatePostDto) {
    return this.postService.createPost(body);
  }

  @ApiOperation({
    summary: '특정 게시물 조회',
  })
  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPost(id);
  }

  @ApiOperation({ summary: '특정 게시물 삭제' })
  @Delete(':id')
  removePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.removePost(id);
  }

  @ApiOperation({ summary: '특정 게시물 업데이트' })
  @Put(':id') //? 한꺼번에 교체하는 방식이라 Put을 사용하였다.
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreatePostDto,
  ) {
    return this.postService.updatePost(id, body);
  }

  @ApiOperation({ summary: '특정 게시물에 댓글 등록' })
  @Post(':id/comments')
  addComment() {
    // TODO
  }

  @ApiOperation({ summary: '특정 게시물의 댓글 목록 조회' })
  @Get(':id/commnets')
  getCommentsList() {
    // TODO
  }

  @ApiOperation({ summary: '특정 게시물의 댓글 삭제' })
  @Delete(':id/comments/:commentId')
  removeComment() {
    // TODO
  }
}
