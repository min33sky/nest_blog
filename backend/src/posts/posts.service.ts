import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { PostsRepository } from 'src/posts/posts.repository';
import { Post } from 'src/posts/schemas/posts.schema';

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

  async getAllPost(): Promise<Post[]> {
    return this.postsRepositoy.getAllPost();
  }

  async getPost(id: string): Promise<Post> {
    const post = await this.postsRepositoy.getPostById(id);
    if (!post) {
      throw new NotFoundException('해당하는 게시물이 없습니다.');
    }
    // ? 500에러를 잡아줘야 할듯
    return post;
  }

  async createPost(body: CreatePostDto): Promise<Post> {
    const result = await this.postsRepositoy.createPost(body);
    return result;
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
