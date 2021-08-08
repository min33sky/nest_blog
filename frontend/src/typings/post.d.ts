/**
 * 게시물 응답 타입
 */
export interface IPostResponse {
  success: boolean;
  data: {
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
  };
}
