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
    return await this.postModel.findById(id).select('-__v');
  }

  async removePostById(id: string): Promise<Post> {
    return await this.postModel.findByIdAndRemove(id).exec();
  }

  async updatePostById(id: string, body: any): Promise<Post> {
    //? {new: true}일 경우 업데이트 된 데이터를 반환. false일 경우 업데이트 전 데이터 반환
    return await this.postModel
      .findByIdAndUpdate(id, body, { new: true })
      .exec();
  }
}
