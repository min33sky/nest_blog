import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';
import oc from 'open-color';
import AskRemoveModal from '@components/post/AskRemoveModal';

const PostActionButtonsBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
  margin-top: -1.5rem;
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: ${oc.gray[6]};
  font-weight: bold;
  border: none;
  outline: none;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    background-color: ${oc.gray[1]};
    color: ${oc.cyan[7]};
  }
  & + & {
    margin-left: 0.25rem;
  }
`;

interface IPostActionButtons {
  onRemove: () => void;
  onUpdate: () => void;
}

/**
 * 게시물 수정, 삭제 버튼
 * @returns
 */
function PostActionButtons({ onUpdate, onRemove }: IPostActionButtons) {
  const [modal, setModal] = useState(false);

  const onRemoveClick = useCallback(() => {
    setModal(true);
  }, []);

  const onCancel = useCallback(() => {
    setModal(false);
  }, []);

  const onConfirm = useCallback(() => {
    setModal(false);
    onRemove();
    console.log('게시글 삭 제 완 료');
  }, [onRemove]);

  return (
    <>
      <PostActionButtonsBlock>
        <ActionButton onClick={onUpdate}>수정</ActionButton>
        <ActionButton onClick={onRemoveClick}>삭제</ActionButton>
      </PostActionButtonsBlock>
      <AskRemoveModal visible={modal} onConfirm={onConfirm} onCancel={onCancel} />
    </>
  );
}

export default PostActionButtons;
