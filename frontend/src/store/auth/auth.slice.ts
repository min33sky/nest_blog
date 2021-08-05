import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token: string | undefined;
}

const initialState: AuthState = {
  token: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      // TODO: 토큰 삭제하기 (로그아웃)
      return state;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
