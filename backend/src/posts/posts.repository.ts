import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  createAndUpdateHtml,
  removeHtmlAndShorten,
} from 'src/common/utils/removeHtml';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { Post } from 'src/posts/schemas/posts.schema';
import { User } from 'src/users/users.schema';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  /**
   * 게시물 리스트 불러오기
   * @param page
   * @param nickname
   * @param tag
   * @returns
   */
  async getAllPost(page: string, nickname: string, tag: string) {
    const pageNum: number = parseInt(page || '1', 10);

    const query = {
      ...(nickname ? { 'user.nickname': nickname } : {}),
      ...(tag ? { tags: tag } : {}),
    };

    //? 최신 게시물부터 보여주기
    const posts = await this.postModel
      .find(query)
      .sort({ _id: -1 })
      .limit(5)
      .skip((pageNum - 1) * 5)
      .lean() //? JSON 형태로 조회하기
      .exec();

    //? 게시물의 총 개수
    const totalPostCount = await this.postModel.countDocuments(query).exec();

    //? 게시물 내용이 길 경우 간략하게 줄여서 보내기
    const modified = posts.map((post) => ({
      ...post,
      content: removeHtmlAndShorten(post.content),
    }));

    return {
      posts: modified,
      totalPostCount,
    };
  }

  /**
   * 게시물 작성
   * @param post
   * @param user
   * @returns
   */
  async createPost(post: CreatePostDto, user: User) {
    const newPost = {
      title: post.title,
      content: createAndUpdateHtml(post.content),
      tags: post.tags,
      user: {
        _id: user._id,
        email: user.email,
        nickname: user.nickname,
      },
    };

    return await this.postModel.create(newPost);
  }

  async getPostById(id: string) {
    return await this.postModel.findById(id).select('-__v').exec();
  }

  async removePostById(id: string): Promise<Post> {
    return await this.postModel.findByIdAndRemove(id).exec();
  }

  /**
   * 게시물 업데이트
   * @param id
   * @param body
   * @returns
   */
  async updatePostById(
    id: string,
    createPostDto: CreatePostDto,
  ): Promise<Post> {
    // ? HTML Filtering
    const updateData = { ...createPostDto };
    if (updateData.content) {
      updateData.content = createAndUpdateHtml(updateData.content);
    }

    //? {new: true}일 경우 업데이트 된 데이터를 반환. false일 경우 업데이트 전 데이터 반환
    return await this.postModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }
}
