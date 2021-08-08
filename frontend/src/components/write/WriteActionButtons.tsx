import Button from '@components/common/Button';
import styled from '@emotion/styled';
import React from 'react';

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

interface IProps {
  onCancel: () => void;
  onPublish: () => void;
}

function WriteActionButtons({ onCancel, onPublish }: IProps) {
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
