import useInput from '@hooks/useInput';
import { setToken } from '@store/auth/auth.slice';
import { LoginResponse } from '@typings/user';
import { loginRequest } from '@utils/api';
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
  const mutation = useMutation(loginRequest, {
    onSuccess: (response: LoginResponse) => {
      const token = response.access_token;
      dispatch(setToken(token));
      sessionStorage.setItem('access_token', token);
      queryClient.invalidateQueries('userStatus');
    },
  });

  const onSubmitForm = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      mutation.mutate({ email, password });
    },
    [email, password, mutation]
  );

  return (
    <div>
      <h3 className="text-3xl text-center text-gray-700">로그인</h3>

      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          className="auth-input"
          placeholder="이메일"
          value={email}
          onChange={onChangeEmail}
        />
        <input
          type="password"
          name="password"
          className="auth-input"
          placeholder="비밀번호"
          value={password}
          onChange={onChangePassword}
        />

        <button type="submit" className="auth-btn">
          로그인
        </button>

        <div className="mt-4 flex justify-end">
          <p>
            아이디가 없다면?{' '}
            <Link to="/register" className="font-bold text-indigo-500 hover:text-indigo-600">
              회원가입
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
