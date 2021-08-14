import useInput from '@hooks/useInput';
import {
  AuthFormContainer,
  StyledInput,
  ButtonWithMarginTop,
  AuthFormFooter,
} from '@pages/Auth/Layouts/AuthForm.styles';
import { setToken } from '@store/auth/auth.slice';
import { loginRequest, requestRegister } from '@utils/api';
import { AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function RegisterForm() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const mutation = useMutation(requestRegister, {
    onSuccess: (data) => {
      console.log('회원 가입 성공');
      console.log(data);
    },
    onError: (data: any) => {
      console.log('회원 가입 실패');
      console.log(data.response);
    },
  });

  const loginMutation = useMutation(loginRequest, {
    onSuccess: (response) => {
      console.log('로그인 성공');
      console.log('데 이 터: ', response.data.access_token);
      const token = response.data.access_token;
      dispatch(setToken(token));
      sessionStorage.setItem('access_token', token);
      queryClient.invalidateQueries('userStatus');
    },
  });

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
    setMismatchError(password !== passwordCheck);
  }, [password, passwordCheck]);

  useEffect(() => {
    checkPassword();
  }, [checkPassword]);

  /**
   * 회원가입 폼 전송 핸들러
   */
  const onSubmitForm = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        console.log('회원가입 정보: ', email, nickname, password, passwordCheck);
        const response = await mutation.mutateAsync({ email, nickname, password });
        console.log('레 스 폰 스 :', response);

        // ? 회원 가입과 동시에 로그인까지 처리
        loginMutation.mutate({ email, password });
      } catch (error) {
        toast.error(`${error.response.data.message}`, { position: 'bottom-center' });
      }
    },
    [email, nickname, password, passwordCheck, mutation, loginMutation]
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
