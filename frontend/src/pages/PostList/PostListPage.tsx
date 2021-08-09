import Button from '@components/common/Button';
import Header from '@components/common/Header';
import PostList from '@components/posts/PostList';
import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

/**
 * 포스트 리스트 페이지 & 메인 페이지
 * [/, /@nickname]
 * @returns
 */
function PostListPage() {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const fetchUrl = queryString.stringify(parsed);

  return (
    <>
      <Header />
      <PostList url={fetchUrl} />
    </>
  );
}

export default PostListPage;
