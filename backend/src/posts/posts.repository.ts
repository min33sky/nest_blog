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

  async getAllPost(page: string) {
    const pageNum: number = parseInt(page || '1', 10);

    //? 최신 게시물부터 보여주기
    const posts = await this.postModel
      .find()
      .sort({ _id: -1 })
      .limit(3)
      .skip((pageNum - 1) * 3)
      .lean() //? JSON 형태로 조회하기
      .exec();

    const totalPostCount = await this.postModel.countDocuments().exec();

    // ? 게시물 내용이 길 경우 간략하게 줄여서 보내기
    const modified = posts.map((post) => ({
      ...post,
      content:
        post.content.length < 7
          ? post.content
          : `${post.content.slice(0, 7)}...`,
    }));

    return {
      posts: modified,
      totalPostCount,
    };
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
