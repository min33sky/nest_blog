import { setToken } from '@store/auth/auth.slice';
import { store } from '@store/store';

/**
 * 토큰이 존재한다면 스토어에 토큰을 저장
 */
export function loadToken() {
  try {
    const token = sessionStorage.getItem('access_token');
    if (!token) return;
    console.log('sessionStorage_token: ', token);
    store.dispatch(setToken(token));
  } catch (error) {
    console.log('sessionStorage is not working');
  }
}
