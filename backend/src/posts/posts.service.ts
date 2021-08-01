import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';
import { PostsRepository } from 'src/posts/posts.repository';
import { Post } from 'src/posts/schemas/posts.schema';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepositoy: PostsRepository) {}

  async getAllPost(): Promise<Post[]> {
    return this.postsRepositoy.getAllPost();
  }

  async getPost(id: string) {
    const post = await this.postsRepositoy.getPostById(id);
    if (!post) throw new NotFoundException('해당하는 게시물이 없습니다.');

    // ? 500에러를 잡아줘야 할듯
    return post.readOnlyData;
  }

  async createPost(body: CreatePostDto): Promise<Post> {
    const result = await this.postsRepositoy.createPost(body);
    return result;
  }

  async removePost(id: string): Promise<Post> {
    const result = await this.postsRepositoy.removePostById(id);
    if (!result) throw new NotFoundException('해당하는 게시물이 없습니다.');
    return result;
  }

  async updatePost(id: string, body: UpdatePostDto): Promise<Post> {
    const result = await this.postsRepositoy.updatePostById(id, body);
    if (!result) throw new NotFoundException('해당하는 게시물이 없습니다.');
    return result;
  }
}
