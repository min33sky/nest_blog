import useInput from '@hooks/useInput';
import { setToken } from '@store/auth/auth.slice';
import { LoginResponse } from '@typings/user';
import { loginRequest, requestRegister } from '@utils/api';
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
    onSuccess: (response: LoginResponse) => {
      console.log('로그인 성공');
      console.log('데 이 터: ', response.access_token);
      const token = response.access_token;
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
      } catch (error: any) {
        toast.error(`${error.response.data.message}`, { position: 'bottom-center' });
      }
    },
    [email, nickname, password, passwordCheck, mutation, loginMutation]
  );

  return (
    <div>
      <h3 className="text-3xl text-center text-gray-700">회원가입</h3>

      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={email}
          onChange={onChangeEmail}
          className="auth-input"
        />
        <input
          type="text"
          name="nickname"
          placeholder="닉네임"
          value={nickname}
          onChange={onChangeNickname}
          className="auth-input"
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={password}
          onChange={onChangePasswordAndCheck}
          className="auth-input"
        />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          value={passwordCheck}
          onChange={onChangePasswordAndCheck}
          className="auth-input"
        />

        <button type="submit" className="auth-btn">
          회원가입
        </button>

        <div className="mt-4 flex justify-end">
          <p>
            이미 회원이라면?{' '}
            <Link to="/login" className="font-bold text-indigo-500 hover:text-indigo-600">
              로그인
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
