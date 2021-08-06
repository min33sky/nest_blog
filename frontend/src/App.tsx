import LoginPage from '@pages/Auth/Login/LoginPage/LoginPage';
import RegisterPage from '@pages/Auth/Register/RegisterPage/RegisterPage';
import PostPage from '@pages/Post/PostPage';
import PostListPage from '@pages/PostList/PostListPage';
import WritePage from '@pages/Write/WritePage';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Switch>
        <Route component={PostListPage} exact path={['/@:username', '/']} />
        <Route component={LoginPage} path="/login" />
        <Route component={RegisterPage} path="/register" />
        <Route component={WritePage} path="/write" />
        <Route component={PostPage} path="/@:nickname/:postId" />
      </Switch>
    </>
  );
}
