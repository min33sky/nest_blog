import AuthLayout from '@pages/Auth/Layouts/AuthLayout';
import { getUserStatus } from '@pages/Auth/Login/LoginPage/LoginPage';
import RegisterForm from '@pages/Auth/Register/RegisterForm/RegisterForm';
import { RootState } from '@store/store';
import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function RegisterPage() {
  const token = useSelector((state: RootState) => state.auth.token);

  const { status, data, error } = useQuery('userStatus', () => getUserStatus(token), {
    // enabled: !!token, // ? 토큰이 없으면 No Fetch~
  });

  if (status === 'loading') {
    console.log('유저 정보 로딩 중 ...');
  }

  if (status === 'error') {
    console.log('유저 정보 로드 에러 ...');
  }

  if (data && status === 'success') {
    console.log('로그인 데이터 [register page]: ', data);
    //! history.push('/')를 사용하면 render()에서 props를 변경하기 때문에 경고 발생
    return <Redirect to="/" />;
  }

  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}

export default RegisterPage;
