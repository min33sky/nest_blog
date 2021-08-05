import AuthLayout from '@pages/Auth/Layouts/AuthLayout';
import LoginForm from '@pages/Auth/Login/LoginForm/LoginForm';
import { RootState } from '@store/store';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

function LoginPage() {
  const token = useSelector((state: RootState) => state.auth.token);

  const { status, data, error } = useQuery(
    'userStatus',
    () =>
      axios.get('/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    {
      enabled: !!token,
    }
  );

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
