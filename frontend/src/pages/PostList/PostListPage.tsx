import Button from '@components/common/Button';
import Header from '@components/common/Header';
import PostList from '@components/posts/PostList';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';

/**
 * 포스트 리스트 페이지 & 메인 페이지
 * [/, /@nickname]
 * @returns
 */
function PostListPage() {
  const location = useLocation();
  const params = useParams();

  let parsed = queryString.parse(location.search);
  parsed = {
    ...parsed,
    ...params,
  };
  const url = queryString.stringify(parsed);

  return (
    <>
      <Header />
      <PostList url={url} />
    </>
  );
}

export default PostListPage;
