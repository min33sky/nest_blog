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
    ...parsed, // query
    ...params, // route parameter
  };
  const url = queryString.stringify(parsed); // ? nickname=닉네임&tag=태그&page=1

  return (
    <>
      <Header />
      <PostList url={url} />
    </>
  );
}

export default PostListPage;
