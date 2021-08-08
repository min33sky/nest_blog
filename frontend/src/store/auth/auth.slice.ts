import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token: string | undefined; // 인증 토큰
  isLoggedIn: boolean; // 로그인 여부
}

const initialState: AuthState = {
  token: undefined,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    removeToken: (state) => {
      state.token = undefined;
      state.isLoggedIn = false;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
