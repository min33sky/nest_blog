import AuthLayout from '@pages/Auth/Layouts/AuthLayout';
import LoginForm from '@pages/Auth/Login/LoginForm/LoginForm';
import { RootState } from '@store/store';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

async function getUserStatus(token?: string) {
  const { data } = await axios.get('/api/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

function LoginPage() {
  const token = useSelector((state: RootState) => state.auth.token);
  const history = useHistory();

  const { status, data, error } = useQuery('userStatus', () => getUserStatus(token), {
    enabled: !!token, // ? 토큰이 없으면 No Fetch~
  });

  if (status === 'loading') {
    console.log('유저 정보 로딩 중 ...');
  }

  if (status === 'error') {
    console.log('유저 정보 로드 에러 ...');
  }

  if (status === 'success') {
    console.log('로그인 데이터 [login page]: ', data);
    //! history.push('/')를 사용하면 render()에서 props를 변경하기 때문에 경고 발생
    return <Redirect to="/" />;
  }

  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}

export default LoginPage;
