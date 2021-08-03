import useInput from '@hooks/useInput';
import {
  AuthFormContainer,
  StyledInput,
  ButtonWithMarginTop,
  AuthFormFooter,
} from '@pages/Auth/AuthForm/AuthForm.styles';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

function LoginForm() {
  const { value: email, handler: onChangeEmail } = useInput('');
  const { value: password, handler: onChangePassword } = useInput('');

  const onSubmitForm = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      console.log('로그인 정보: ', email, password);
    },
    [email, password]
  );

  return (
    <AuthFormContainer>
      <h3>로그인</h3>
      <form onSubmit={onSubmitForm}>
        <StyledInput
          autoComplete="email"
          name="email"
          placeholder="이메일"
          type="email"
          value={email}
          onChange={onChangeEmail}
        />
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={onChangePassword}
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
