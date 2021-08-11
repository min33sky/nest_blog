import AskModal, { IAskModal } from '@components/common/AskModal';
import React from 'react';

interface IAskRemoveModal {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function AskRemoveModal({ visible, onConfirm, onCancel }: IAskRemoveModal) {
  return (
    <AskModal
      visible={visible}
      title="포스트 삭제"
      description="포스트를 정말 삭제하시겠습니까?"
      confirmText="삭제"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}

export default AskRemoveModal;
