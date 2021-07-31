import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { PostsRepository } from 'src/posts/posts.repository';

const postId = 1;

const posts = [
  {
    id: 1,
    title: '제목',
    body: '내용',
  },
];

@Injectable()
export class PostsService {
  constructor(private readonly postsRepositoy: PostsRepository) {}

  getAllPost() {
    return {
      success: true,
      data: posts,
    };
  }

  async createPost(body: CreatePostDto) {
    //* API 호출
    const result = await this.postsRepositoy.create(body);

    return {
      success: true,
      data: result,
    };
  }

  getPost(id: number) {
    const post = posts.find((post) => post.id === id);
    if (!post) throw new NotFoundException('해당 게시물이 없어요..');
    return {
      success: true,
      data: post,
    };
  }

  removePost(id: number) {
    const pIndex = posts.findIndex((post) => post.id === id);

    if (pIndex === -1) throw new NotFoundException('해당 게시물이 없습니다.');

    // 삭제하기
    posts.splice(pIndex, 1);

    return {
      success: true,
      data: posts,
    };
  }

  updatePost(id: number, body: CreatePostDto) {
    const pIndex = posts.findIndex((post) => post.id === id);
    if (pIndex === -1) throw new NotFoundException('해당 게시물이 없습니다.');

    // posts[pIndex] = {
    //   id,
    //   ...body,
    // };

    return {
      success: true,
      data: posts[pIndex],
    };
  }
}
