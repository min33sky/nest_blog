import { setToken } from '@store/auth/auth.slice';
import { store } from '@store/store';

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
