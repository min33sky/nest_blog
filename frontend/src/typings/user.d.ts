/**
 * 로그인 성공 응답
 */
export interface LoginResponse {
  /**
   * jwt
   */
  success: boolean;
  data: {
    access_token: string;
  };
}

/**
 * 회원가입 성공 응답
 */
export interface RegisterResponse {
  id: string;
  email: string;
  nickname: string;
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
