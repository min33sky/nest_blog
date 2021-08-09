import useInput from '@hooks/useInput';
import {
  AuthFormContainer,
  StyledInput,
  ButtonWithMarginTop,
  AuthFormFooter,
} from '@pages/Auth/Layouts/AuthForm.styles';
import { setToken } from '@store/auth/auth.slice';
import { LoginResponse } from '@typings/user';
import axios, { AxiosResponse } from 'axios';
import React, { useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export async function loginRequest(loginData: { email: string; password: string }) {
  const { data } = await axios.post<LoginResponse>('/api/users/login', loginData);
  return data;
}

function LoginForm() {
  const { value: email, handler: onChangeEmail } = useInput('');
  const { value: password, handler: onChangePassword } = useInput('');
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // ? react-query를 사용해서 뮤테이트
  const mutation = useMutation(loginRequest, {
    onSuccess: (response) => {
      console.log('로그인 성공');
      console.log('데 이 터: ', response.data.access_token);
      const token = response.data.access_token;
      dispatch(setToken(token));
      sessionStorage.setItem('access_token', token);
      queryClient.invalidateQueries('userStatus');
    },
  });

  const onSubmitForm = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      console.log('로그인 정보: ', email, password);

      mutation.mutate({ email, password });
    },
    [email, password, mutation]
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
