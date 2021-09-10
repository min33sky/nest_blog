import React from 'react';
import { getUserStatus } from '@pages/Auth/Login/LoginPage/LoginPage';
import { removeToken } from '@store/auth/auth.slice';
import { RootState } from '@store/store';
import { useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import gravatar from 'gravatar';
import { LoginIcon, LogoutIcon } from '@heroicons/react/outline';

function Header() {
  const token = useSelector((state: RootState) => state.auth.token);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { status, data, error } = useQuery('userStatus', () => getUserStatus(token), {
    enabled: !!token, // ? 토큰이 없으면 No Fetch~
  });

  const onLogout = () => {
    /**
     *? 로그아웃
     *? JWT Logout은 API 요청할 필요없이 토큰을 제거해주면 된다.
     */
    dispatch(removeToken());
    queryClient.setQueriesData('userStatus', undefined); // ? 리패치 대신 직접 캐시된 값을 수정한다.
    sessionStorage.removeItem('access_token');
  };

  return (
    <>
      <header className="sticky top-0 w-full shadow-md bg-gray-50">
        <div className="flex justify-between px-4 py-4 sm:px-10 ">
          <div className="flex">
            <Link to="/" className="text-xl tracking-widest hover:animate-pulse">
              <span className="text-3xl text-indigo-400">N</span>EST{' '}
              <span className="text-3xl text-pink-400">B</span>LOG
            </Link>
          </div>

          <div className="flex items-center">
            {isLoggedIn && (
              <div className="flex items-center space-x-3">
                <img
                  className="h-10 rounded-full"
                  src={`${gravatar.url(data?.user.email!, { d: 'retro' })}`}
                  alt="user-icon"
                />
                <p className="text-xl font-bold">{data?.user.nickname}</p>
                <LogoutIcon className="h-10 cursor-pointer" onClick={onLogout} />
              </div>
            )}
            {!isLoggedIn && (
              <div className="flex items-center">
                <Link to="/login">
                  <LoginIcon className="h-10 cursor-pointer" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 게시물 리스트 시작 위치 조정 */}
      {/* <div className="h-16" /> */}
    </>
  );
}

export default Header;
