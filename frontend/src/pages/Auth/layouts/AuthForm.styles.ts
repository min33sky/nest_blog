import Button from '@components/common/Button';
import styled from '@emotion/styled';
import oc from 'open-color';

export const AuthFormContainer = styled.div`
  h3 {
    margin: 0;
    color: ${oc.gray[8]};
    margin-bottom: 1rem;
  }
`;

export const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${oc.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;

  &:focus {
    color: ${oc.teal[7]};
    border-bottom: 1px solid ${oc.gray[7]};
  }

  & + & {
    margin-top: 1rem;
  }
`;

export const AuthFormFooter = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${oc.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${oc.gray[9]};
    }
  }
`;

export const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;
