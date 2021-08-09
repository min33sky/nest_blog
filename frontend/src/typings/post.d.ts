export interface IPost {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  user: {
    _id: string;
    email: string;
    nickname: string;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * 게시물 응답 타입
 */
export interface IPostResponse {
  success: boolean;
  data: IPost;
}

/**
 * 게시물 리스트 응답 타입
 */
export interface IPostListResponse {
  success: boolean;
  data: {
    posts: IPost[];
    totalPostCount: number;
  };
}
