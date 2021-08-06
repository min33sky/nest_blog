import useInput from '@hooks/useInput';
import {
  AuthFormContainer,
  StyledInput,
  ButtonWithMarginTop,
  AuthFormFooter,
} from '@pages/Auth/AuthForm/AuthForm.styles';
import { setToken } from '@store/auth/auth.slice';
import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function LoginForm() {
  const { value: email, handler: onChangeEmail } = useInput('');
  const { value: password, handler: onChangePassword } = useInput('');
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // ? react-query를 사용해서 뮤테이트
  const mutation = useMutation(
    (loginData: { email: string; password: string }) => axios.post('/api/users/login', loginData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userStatus');
      },
    }
  );

  const onSubmitForm = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      console.log('로그인 정보: ', email, password);

      mutation.mutate({ email, password });
    },
    [email, password, mutation]
  );

  useEffect(() => {
    console.log('뮤테이션 데이터:', mutation.data?.data.data.access_token);
    const token = mutation.data?.data.data.access_token;
    dispatch(setToken(token));
    localStorage.setItem('access_token', token);
  }, [mutation.data, dispatch]);

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
