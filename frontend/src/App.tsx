import LoginPage from '@pages/Auth/Login/LoginPage/LoginPage';
import RegisterPage from '@pages/Auth/Register/RegisterPage/RegisterPage';
import PostPage from '@pages/Post/PostPage';
import PostListPage from '@pages/PostList/PostListPage';
import WritePage from '@pages/Write/WritePage';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Switch } from 'react-router-dom';
// ? 리액트 토스트 관련 모듈
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <Helmet>
        <title>NEST BLOG</title>
      </Helmet>

      <Switch>
        <Route component={PostListPage} exact path={['/@:nickname', '/']} />
        <Route component={LoginPage} path="/login" />
        <Route component={RegisterPage} path="/register" />
        <Route component={WritePage} path={['/write/:postId', '/write']} />
        <Route component={PostPage} path="/@:nickname/:postId" />
      </Switch>

      <ToastContainer />
    </>
  );
}
