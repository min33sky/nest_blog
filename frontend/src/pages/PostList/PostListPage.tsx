import Button from '@components/common/Button';
import Header from '@components/common/Header';
import PostList from '@components/posts/PostList';
import React from 'react';

/**
 * 포스트 리스트 페이지 & 메인 페이지
 * [/, /@nickname]
 * @returns
 */
function PostListPage() {
  return (
    <>
      <Header />
      <PostList />
    </>
  );
}

export default PostListPage;
