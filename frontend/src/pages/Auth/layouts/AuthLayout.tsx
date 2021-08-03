import styled from '@emotion/styled';
import React from 'react';
import oc from 'open-color';
import { Link } from 'react-router-dom';

/**
 *? 회원가입 / 로그인 페이지의 레이아웃을 담당
 */

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: ${oc.gray[2]};

  /* flex로 내부 내용 중앙 정렬 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }

  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background-color: white;
  border-radius: 2px;
`;

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Content>
        <div className="logo-area">
          <Link to="/">Nest Level</Link>
        </div>
        {children}
      </Content>
    </Container>
  );
}

export default AuthLayout;
