import { IPostResponse } from '@typings/post';
import { LoginResponse } from '@typings/user';
import axios, { AxiosResponse } from 'axios';

export async function loginRequest(loginData: { email: string; password: string }) {
  const { data } = await axios.post<AxiosResponse<LoginResponse>>('/api/users/login', loginData);
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
