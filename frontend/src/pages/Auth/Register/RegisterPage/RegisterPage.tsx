import AuthLayout from '@pages/Auth/layouts/AuthLayout';
import RegisterForm from '@pages/Auth/Register/RegisterForm/RegisterForm';
import React from 'react';

function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}

export default RegisterPage;
