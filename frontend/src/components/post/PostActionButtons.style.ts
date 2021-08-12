import styled from '@emotion/styled';
import oc from 'open-color';

export const PostActionButtonsBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
  margin-top: -1.5rem;
`;

export const ActionButton = styled.button`
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
