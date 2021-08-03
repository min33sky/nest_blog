import styled from '@emotion/styled';
import React from 'react';
import oc from 'open-color';
import Button from '@components/common/Button';
import { Link } from 'react-router-dom';

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

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

function LoginForm() {
  return (
    <AuthFormContainer>
      <h3>로그인</h3>
      <form>
        <StyledInput autoComplete="email" name="email" placeholder="이메일" />
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
        />

        <ButtonWithMarginTop cyan fullWidth>
          로그인
        </ButtonWithMarginTop>

        <AuthFormFooter>
          <Link to="/register">회원가입</Link>
        </AuthFormFooter>
      </form>
    </AuthFormContainer>
  );
}

export default LoginForm;
