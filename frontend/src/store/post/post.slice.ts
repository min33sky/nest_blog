import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PostState {
  title: string;
  content: string;
  tags: string[];
}

const initialState: PostState = {
  title: '',
  content: '',
  tags: [],
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    /**
     * TODO:
     * 1. 타이틀 인풋 핸들러
     * 2. 게시 내용 인풋 핸들러
     * 3. 태그 등록
     *? 4. 인풋 클리어 액션?
     */
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    addTag: (state, action: PayloadAction<string>) => {
      state.tags.push(action.payload);
    },
    removeTag: (state, action: PayloadAction<string>) => {
      const index = state.tags.findIndex((tag) => tag === action.payload);
      if (index !== -1) {
        state.tags.splice(index, 1);
      }
    },
    clearEditor: (state) => {
      state.title = '';
      state.content = '';
      state.tags = [];
    },
  },
});

export const { setTitle, setContent, addTag, removeTag, clearEditor } = postSlice.actions;

export default postSlice.reducer;
