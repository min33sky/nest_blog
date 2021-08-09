import Button from '@components/common/Button';
import Responsive from '@components/common/Responsive';
import SubInfo from '@components/common/SubInfo';
import Tags from '@components/common/Tags';
import styled from '@emotion/styled';
import { getPostList } from '@utils/api';
import oc from 'open-color';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { IPost } from '@typings/post';

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  /* 맨 위 포스트는 padding-top 없음 */
  &:first-of-type {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${oc.gray[2]};
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${oc.gray[6]};
    }
  }

  p {
    margin-top: 2rem;
  }
`;

// const Tags = styled.div`
//   margin-top: 0.5rem;
//   .tag {
//     display: inline-block;
//     color: ${oc.cyan[7]};
//     text-decoration: none;
//     margin-right: 0.5rem;
//     &:hover {
//       color: ${oc.cyan[6]};
//     }
//   }
// `;

const PostItem = ({ post }: { post: IPost }) => {
  return (
    <PostItemBlock>
      <h2>
        <Link to={`/@${post.user.nickname}/${post._id}`}>{post.title}</Link>
      </h2>
      <SubInfo nickname={post.user.nickname} publishedDate={post.updatedAt} />
      <Tags tags={post.tags} />
      <p>{post.content}</p>
    </PostItemBlock>
  );
};

function PostList({ url }: { url: string }) {
  const { status, data } = useQuery(['query', url], () => getPostList(url), {
    // enabled: !!fetchUrl,
  });

  if (status === 'loading') {
    return <PostListBlock>로딩중......</PostListBlock>;
  }

  if (status === 'error' || !data) {
    return <PostListBlock>데이터 없어요 혹은 에러</PostListBlock>;
  }

  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', url);

  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        <Button cyan to="/write">
          새 글 작성하기 [로그인 시만 뜨게 바꾼다]
        </Button>
      </WritePostButtonWrapper>
      <div>
        {data.data.posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </PostListBlock>
  );
}

export default PostList;
