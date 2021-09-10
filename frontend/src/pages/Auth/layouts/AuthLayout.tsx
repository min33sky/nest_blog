import React from 'react';
import { Link } from 'react-router-dom';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-200 w-full h-screen flex flex-col justify-center items-center">
      <div className="bg-white w-full px-8 py-20 sm:max-w-screen-md shadow-lg rounded-md">
        <div className="text-center text-2xl mb-10 animate-bounce tracking-wider">
          <Link to="/">
            <span className="text-3xl text-indigo-400">N</span>est{' '}
            <span className="text-3xl text-pink-400">L</span>evel
          </Link>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
