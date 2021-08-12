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

    /**
     * 에디터 상태 초기화
     * @param state
     */
    clearEditor: (state) => {
      state.title = '';
      state.content = '';
      state.tags = [];
    },

    /**
     * ? 기존의 게시글을 불러서 초기화히기 (수정할 때 사용)
     * @param state
     * @param action
     */
    loadPost: (state, action: PayloadAction<PostState>) => {
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.tags = action.payload.tags;
    },
  },
});

export const { setTitle, setContent, addTag, removeTag, clearEditor, loadPost } = postSlice.actions;

export default postSlice.reducer;
