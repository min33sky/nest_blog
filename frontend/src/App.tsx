import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Switch } from 'react-router-dom';
// ? 리액트 토스트 관련 모듈
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = lazy(() => import('./pages/Auth/Login/LoginPage/LoginPage'));
const Register = lazy(() => import('./pages/Auth/Register/RegisterPage/RegisterPage'));
const PostList = lazy(() => import('./pages/PostList/PostListPage'));
const Write = lazy(() => import('./pages/Write/WritePage'));
const Post = lazy(() => import('./pages/Post/PostPage'));

export default function App() {
  return (
    <>
      <Helmet>
        <title>NEST BLOG</title>
      </Helmet>

      <Suspense fallback={<p>Loading....</p>}>
        <Switch>
          <Route component={PostList} exact path={['/@:nickname', '/']} />
          <Route component={Login} path="/login" />
          <Route component={Register} path="/register" />
          <Route component={Write} path={['/write/:postId', '/write']} />
          <Route component={Post} path="/@:nickname/:postId" />
        </Switch>
      </Suspense>

      {/* 리액트 토스트 */}
      <ToastContainer />
    </>
  );
}
