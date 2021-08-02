import Login from '@pages/Login/LoginPage';
import Post from '@pages/Post/PostPage';
import PostList from '@pages/PostList/PostListPage';
import Register from '@pages/Register/RegisterPage';
import Write from '@pages/Write/WritePage';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Switch>
        <Route component={PostList} exact path={['/@:username', '/']} />
        <Route component={Login} path="/login" />
        <Route component={Register} path="/register" />
        <Route component={Write} path="/write" />
        <Route component={Post} path="/@:nickname/:postId" />
      </Switch>
    </>
  );
}
