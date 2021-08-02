import LoginPage from '@pages/Login/LoginPage';
import PostPage from '@pages/Post/PostPage';
import PostListPage from '@pages/PostList/PostListPage';
import RegisterPage from '@pages/Register/RegisterPage';
import WritePage from '@pages/Write/WritePage';
import React from 'react';
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
