import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiQuery({
    name: 'tag',
    required: false,
  })
  @Get()
  async getAllPosts(
    @Query('page') page: string,
    @Query('nickname') nickname: string,
    @Query('tag') tag: string,
  ) {
    /**
     * ? querystring이 없을 경우에 pipe를 쓰면 에러가 난다
     * ? 한글 처리를 위해 decodeURI()를 사용하자
     * ! query가 없을 시에 undefined가 문자열타입 undefined가 되니 조심하자
     */
    const decodedTag = tag ? decodeURI(tag) : undefined;
    const decodedNickname = nickname ? decodeURI(nickname) : undefined;
    return await this.postService.getAllPost(page, decodedNickname, decodedTag);
  }

  @ApiOperation({ summary: '게시물 작성' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: User,
  ) {
    console.log('글 내 용 ~~~~~~ :', createPostDto.content);
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
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removePost(@Param('id') id: string, @CurrentUser() user: User) {
    const post = await this.postService.getPost(id);
    //? objectId와 string을 비교할 땐 string형으로 변환 후 비교하자
    if (post.user._id.toString() !== user.id) {
      throw new UnauthorizedException('게시물의 작성자가 아닙니다.');
    }

    return await this.postService.removePost(id);
  }

  @ApiOperation({ summary: '특정 게시물 업데이트' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser() user: User,
  ) {
    const post = await this.postService.getPost(id);
    if (post.user._id.toString() !== user.id) {
      throw new UnauthorizedException('게시물의 작성자가 아닙니다.');
    }

    return await this.postService.updatePost(id, updatePostDto);
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
