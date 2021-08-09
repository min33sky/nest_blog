import { IPostResponse } from '@typings/post';
import { LoginResponse, RegisterResponse } from '@typings/user';
import axios from 'axios';

/**
 * 로그인 요청
 * @param loginData
 * @returns
 */
export async function loginRequest(loginData: { email: string; password: string }) {
  const { data } = await axios.post<LoginResponse>('/api/users/login', loginData);
  return data;
}

/**
 * 회원가입 요청
 * @param signupData
 * @returns
 */
export async function requestRegister(signupData: {
  email: string;
  password: string;
  nickname: string;
}) {
  const { data } = await axios.post<RegisterResponse>('/api/users', signupData);
  return data;
}

/**
 * 포스트 등록 함수
 * @param postData
 * @returns
 */
export async function createPost(postData: { title: string; content: string; tags?: string[] }) {
  const token = sessionStorage.getItem('access_token');
  const { data } = await axios.post<IPostResponse>('/api/posts', postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

/**
 * 포스트 불러오기
 * @param postId 게시물 아이디
 * @returns
 */
export async function getPost(postId: string) {
  const { data } = await axios.get<IPostResponse>(`/api/posts/${postId}`);
  return data;
}
