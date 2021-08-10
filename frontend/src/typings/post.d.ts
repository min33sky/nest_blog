/**
 * 게시물 타입
 */
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
    /**
     * 게시물 목록
     */
    posts: IPost[];
    /**
     * 게시물의 총 개수
     */
    totalPostCount: number;
    /**
     * 현재 페이지 번호
     */
    pageNum: number;
  };
}
