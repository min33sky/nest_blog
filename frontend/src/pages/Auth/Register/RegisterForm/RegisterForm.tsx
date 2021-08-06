import useInput from '@hooks/useInput';
import {
  AuthFormContainer,
  StyledInput,
  ButtonWithMarginTop,
  AuthFormFooter,
} from '@pages/Auth/Layouts/AuthForm.styles';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RegisterForm() {
  const { value: email, handler: onChangeEmail } = useInput('');
  const { value: nickname, handler: onChangeNickname } = useInput('');
  const { value: password, setValue: setPassword } = useInput('');
  const { value: passwordCheck, setValue: setPasswordCheck } = useInput('');
  const [mismatchError, setMismatchError] = useState(false); // 패스워드 일치 여부

  /**
   * 패스워드 & 패스워드 확인 인풋 핸들러
   */
  const onChangePasswordAndCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentInput = e.target.name;
      if (currentInput === 'password') {
        setPassword(e.target.value);
      } else {
        setPasswordCheck(e.target.value);
      }
    },
    [setPassword, setPasswordCheck]
  );

  /**
   * 비밀번호 & 비밀번호 확인 일치 여부
   */
  const checkPassword = useCallback(() => {
    console.log('password, passwordCheck:', password, passwordCheck);
    setMismatchError(password !== passwordCheck);
  }, [password, passwordCheck]);

  useEffect(() => {
    checkPassword();
  }, [checkPassword]);

  /**
   * 회원가입 폼 전송 핸들러
   */
  const onSubmitForm = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      console.log('회원가입 정보: ', email, nickname, password, passwordCheck);
    },
    [email, nickname, password, passwordCheck]
  );

  return (
    <AuthFormContainer>
      <h3>회원가입</h3>
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
          autoComplete="nickname"
          name="nickname"
          placeholder="닉네임"
          type="text"
          value={nickname}
          onChange={onChangeNickname}
        />

        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={onChangePasswordAndCheck}
        />

        <StyledInput
          autoComplete="new-password"
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          type="password"
          value={passwordCheck}
          onChange={onChangePasswordAndCheck}
        />

        <ButtonWithMarginTop cyan fullWidth>
          회원가입
        </ButtonWithMarginTop>

        <AuthFormFooter>
          <Link to="/login">로그인</Link>
        </AuthFormFooter>
      </form>
    </AuthFormContainer>
  );
}

export default RegisterForm;
