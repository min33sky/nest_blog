import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { Post } from 'src/posts/schemas/posts.schema';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async getAllPost(): Promise<Post[]> {
    return await this.postModel.find().exec();
  }

  async createPost(post: CreatePostDto): Promise<Post> {
    return await this.postModel.create(post);
  }

  async getPostById(id: string) {
    return await this.postModel.findById(id);
  }
}
