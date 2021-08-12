import Button from '@components/common/Button';
import styled from '@emotion/styled';
import { clearEditor } from '@store/post/post.slice';
import { RootState } from '@store/store';
import { createPost, updatePost } from '@utils/api';
import React, { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

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

interface IWriteActionButtons {
  postId?: string;
}

/**
 * 포스트 등록 버튼 컴포넌트
 * @returns
 */
function WriteActionButtons({ postId }: IWriteActionButtons) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { title, content, tags } = useSelector((state: RootState) => state.post);
  const createMutation = useMutation(createPost);
  const UpdateMutation = useMutation(() => updatePost({ title, content, tags }, postId));

  const onPublish = useCallback(async () => {
    try {
      const response = await createMutation.mutateAsync({
        title,
        content,
        tags,
      });

      toast.success('게시물이 등록되었습니다. :)', { position: 'bottom-center' });
      dispatch(clearEditor());

      //* 임시로 메인 화면으로 라우팅
      history.push(`/@${response.data.user.nickname}/${response.data._id}`);
    } catch (error) {
      toast.error('게시물 등록 실패 :<', { position: 'bottom-center' });
    }
  }, [title, content, tags, createMutation, history, dispatch]);

  const onUpdate = useCallback(async () => {
    try {
      const response = await UpdateMutation.mutateAsync();

      dispatch(clearEditor());

      toast.success('게시물이 수정되었습니다. :)', { position: 'bottom-center' });

      //* 임시로 메인 화면으로 라우팅
      history.push(`/@${response.data.user.nickname}/${response.data._id}`);
    } catch (error) {
      toast.error('게시물 등록 실패 :<', { position: 'bottom-center' });
    }
  }, [UpdateMutation, history, dispatch]);

  const onCancel = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <WriteActionButtonsBlock>
      {postId && (
        <StyledButton cyan onClick={onUpdate}>
          포스트 수정
        </StyledButton>
      )}
      {!postId && (
        <StyledButton cyan onClick={onPublish}>
          포스트 등록
        </StyledButton>
      )}

      <StyledButton onClick={onCancel}>취소</StyledButton>
    </WriteActionButtonsBlock>
  );
}

export default WriteActionButtons;
