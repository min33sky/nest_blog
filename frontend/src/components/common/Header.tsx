import Button from '@components/common/Button';
import Responsive from '@components/common/Responsive';
import styled from '@emotion/styled';
import { getUserStatus } from '@pages/Auth/Login/LoginPage/LoginPage';
import { removeToken } from '@store/auth/auth.slice';
import { RootState } from '@store/store';
import { IUserStatus } from '@typings/user';
import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

/**
 *? Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 */
const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 자식 앨리먼트 사이의 여백을 최대로 설정 */

  & div.logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }

  & div.right {
    display: flex;
    align-items: center;
  }
`;

/**
 *? 헤더가 fixed로 되어 있기 때문에 페이지의 콘텐츠가 4rem 아래에 나타나도록 해 주는 컴포넌트
 */
const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

function Header() {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { status, data, error } = useQuery('userStatus', () => getUserStatus(token), {
    enabled: !!token, // ? 토큰이 없으면 No Fetch~
  });

  console.log('--헤더 데이터: ', data?.data);

  const onLogout = () => {
    console.log('로 그 아 웃');
    dispatch(removeToken());
    queryClient.setQueriesData('userStatus', undefined); // ? 리패치 대신 직접 캐시된 값을 수정한다.
  };

  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <div className="logo">NEST BLOG</div>
          {data && (
            <div className="right">
              <UserInfo>{data.data.nickname}</UserInfo>
              <Button onClick={onLogout}>로그아웃</Button>
            </div>
          )}
          {!data && (
            <div className="right">
              <Button to="/login">로그인</Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
}

export default Header;