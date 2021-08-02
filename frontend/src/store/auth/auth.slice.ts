import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {}

const initialState: AuthState = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    sample: (state) => {},
  },
});

export const { sample } = authSlice.actions;

export default authSlice.reducer;
