import AuthForm from '@pages/Auth/AuthForm/AuthForm';
import AuthLayout from '@pages/Auth/Layouts/AuthLayout';
import React from 'react';

function LoginPage() {
  return (
    <AuthLayout>
      <AuthForm type="Login" />
    </AuthLayout>
  );
}

export default LoginPage;
