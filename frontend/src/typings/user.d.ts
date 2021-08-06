/**
 * 로그인 성공 응답
 */
export interface LoginResponse {
  /**
   * jwt
   */
  access_token: string;
}

/**
 * 로그인 유저 정보
 */
export interface IUserStatus {
  success: boolean;
  data: {
    _id: string;
    email: string;
    nickname: string;
    createdAt: string;
    updatedAt: string;
  };
}
