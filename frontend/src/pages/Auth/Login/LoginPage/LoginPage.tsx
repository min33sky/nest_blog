import AuthLayout from '@pages/Auth/Layouts/AuthLayout';
import LoginForm from '@pages/Auth/Login/LoginForm/LoginForm';
import React from 'react';

function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}

export default LoginPage;
