import Responsive from '@components/common/Responsive';
import styled from '@emotion/styled';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import oc from 'open-color';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { setContent, setTitle } from '@store/post/post.slice';

const EditorBlock = styled(Responsive)`
  /* 페이지 위 아래 여백 지정 */
  padding-top: 5rem;
  padding-bottom: 2rem;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${oc.gray[4]};
  margin-bottom: 2rem;
  width: 100%;
`;

const QuillWrapper = styled.div`
  border-bottom: 10px red;
  /* 최소 크기 지정 및 padding 제거 */
  .ql-editor {
    padding: 10px;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }

  /* 에디터 창 높이 */
  .ql-container {
    height: 400px;
  }

  .ql-editor.ql-blank::before {
    left: 10px;
  }
`;

function Editor() {
  const QuillRef = useRef<ReactQuill>();
  const title = useSelector((state: RootState) => state.post.title);
  const content = useSelector((state: RootState) => state.post.content);
  const dispatch = useDispatch();

  const onChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setTitle(e.target.value));
    },
    [dispatch]
  );

  const onChangeContent = useCallback(
    (text: string) => {
      dispatch(setContent(text));
    },
    [dispatch]
  );

  //* Quill 모듈 설정
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            { align: [] },
          ],
          ['image', 'video'],
        ],
        handlers: {
          // image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <EditorBlock>
      <TitleInput value={title} onChange={onChangeTitle} placeholder="제목을 입력하세요" />
      <QuillWrapper>
        <ReactQuill
          ref={(element) => {
            if (element !== null) {
              QuillRef.current = element;
            }
          }}
          value={content}
          onChange={onChangeContent}
          modules={modules}
          theme="snow"
          placeholder="내용을 입력해주세요."
        />
      </QuillWrapper>
    </EditorBlock>
  );
}

export default Editor;
