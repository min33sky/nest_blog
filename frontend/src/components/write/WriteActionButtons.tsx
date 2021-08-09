import Button from '@components/common/Button';
import styled from '@emotion/styled';
import { RootState } from '@store/store';
import { createPost } from '@utils/api';
import React, { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const WriteActionButtonsBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
  padding-left: 1rem;
  button + button {
    margin-left: 0.5rem;
  }
`;

/* TagBox에서 사용하는 버튼과 일치하는 높이로 설정한 후 서로간의 여백 지정 */
const StyledButton = styled(Button)`
  height: 2.125rem;
  & + & {
    margin-left: 0.5rem;
  }
`;

/**
 * 포스트 등록 버튼 컴포넌트
 * @returns
 */
function WriteActionButtons() {
  const history = useHistory();
  const mutation = useMutation(createPost);
  const { title, content, tags } = useSelector((state: RootState) => state.post);

  const onPublish = useCallback(async () => {
    try {
      const response = await mutation.mutateAsync({
        title,
        content,
        tags,
      });

      // TODO: 해당 게시물 화면으로 이동
      // ? 임시로 메인 화면으로 라우팅
      history.push('/');
    } catch (error) {
      console.log('게시물 등록 실해', error.response);
    }
  }, [title, content, tags, mutation]);

  const onCancel = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <WriteActionButtonsBlock>
      <StyledButton cyan onClick={onPublish}>
        포스트 등록
      </StyledButton>
      <StyledButton onClick={onCancel}>취소</StyledButton>
    </WriteActionButtonsBlock>
  );
}

export default WriteActionButtons;
