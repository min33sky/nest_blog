import AuthForm from '@pages/Auth/AuthForm/AuthForm';
import AuthLayout from '@pages/Auth/Layouts/AuthLayout';
import React from 'react';

function RegisterPage() {
  return (
    <AuthLayout>
      <AuthForm type="Register" />
    </AuthLayout>
  );
}

export default RegisterPage;
