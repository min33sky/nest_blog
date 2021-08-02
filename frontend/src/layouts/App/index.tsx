import Login from '@pages/Login';
import Post from '@pages/Post';
import PostList from '@pages/PostList';
import Register from '@pages/Register';
import Write from '@pages/Write';
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
