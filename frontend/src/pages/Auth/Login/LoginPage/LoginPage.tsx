import AuthLayout from '@pages/Auth/Layouts/AuthLayout';
import LoginForm from '@pages/Auth/Login/LoginForm/LoginForm';
import { RootState } from '@store/store';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

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

  const { status, data, error } = useQuery('userStatus', () => getUserStatus(token), {
    enabled: !!token, // ? 토큰이 없으면 No Fetch~
  });

  if (status === 'loading') {
    console.log('데이터 로딩 중 ..............');
  }

  if (status === 'success') {
    console.log('데이터: ', data);
  }

  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}

export default LoginPage;
