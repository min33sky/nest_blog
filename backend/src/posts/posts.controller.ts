import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { PostResponseDto } from 'src/posts/dto/post.response.dto';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';
import { PostsService } from 'src/posts/posts.service';
import { User } from 'src/users/users.schema';

@ApiTags('Posts')
@Controller('api/posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @ApiOperation({ summary: '모든 게시물 조회' })
  @ApiOkResponse({ description: '게시물 목록' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPosts(@Query('page') page) {
    //? parseIntPipe를 쓰면 page가 없을 경우 에러남
    const result = await this.postService.getAllPost(page);
    return result;
  }

  @ApiOperation({ summary: '게시물 작성' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: User,
  ) {
    return this.postService.createPost(createPostDto, user);
  }

  @ApiOperation({ summary: '특정 게시물 조회' })
  @ApiOkResponse({
    description: '특정 게시물 조회 성공',
    type: PostResponseDto,
  })
  @Get(':id')
  async getPost(@Param('id') id: string) {
    return await this.postService.getPost(id);
  }

  @ApiOperation({ summary: '특정 게시물 삭제' })
  @Delete(':id')
  async removePost(@Param('id') id: string) {
    return await this.postService.removePost(id);
  }

  @ApiOperation({ summary: '특정 게시물 업데이트' })
  @Patch(':id') //? 한꺼번에 교체하는 방식이라 Put을 사용하였다.
  updatePost(@Param('id') id: string, @Body() body: UpdatePostDto) {
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
