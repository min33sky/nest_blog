import React, { useCallback, useState } from 'react';
import AskRemoveModal from '@components/post/AskRemoveModal';
import { toast } from 'react-toastify';
import { PostActionButtonsBlock, ActionButton } from '@components/post/PostActionButtons.style';

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
    toast.success('삭제 완료 :)', { position: 'bottom-center' });
  }, [onRemove]);

  return (
    <>
      <PostActionButtonsBlock>
        <ActionButton onClick={onUpdate}>수정</ActionButton>
        <ActionButton onClick={onRemoveClick}>삭제</ActionButton>
      </PostActionButtonsBlock>

      {/* 포스트 삭제 모달 */}
      <AskRemoveModal visible={modal} onConfirm={onConfirm} onCancel={onCancel} />
    </>
  );
}

export default PostActionButtons;
