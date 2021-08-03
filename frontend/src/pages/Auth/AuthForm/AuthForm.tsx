import React from 'react';
import { Link } from 'react-router-dom';
import {
  AuthFormContainer,
  StyledInput,
  ButtonWithMarginTop,
  AuthFormFooter,
} from '@pages/Auth/AuthForm/AuthForm.styles';

type AuthType = 'Login' | 'Register';

interface IAuthForm {
  type: AuthType;
}

function AuthForm({ type }: IAuthForm) {
  return (
    <AuthFormContainer>
      <h3>{type === 'Login' ? '로그인' : '회원가입'}</h3>
      <form>
        <StyledInput autoComplete="email" name="email" placeholder="이메일" />
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
        />

        <ButtonWithMarginTop cyan fullWidth>
          {type === 'Login' ? '로그인' : '회원가입'}
        </ButtonWithMarginTop>

        <AuthFormFooter>
          {type === 'Login' ? (
            <Link to="/register">회원가입</Link>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </AuthFormFooter>
      </form>
    </AuthFormContainer>
  );
}

export default AuthForm;
