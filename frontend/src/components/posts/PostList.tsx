import Button from '@components/common/Button';
import Responsive from '@components/common/Responsive';
import SubInfo from '@components/common/SubInfo';
import Tags from '@components/common/Tags';
import styled from '@emotion/styled';
import { getPostList } from '@utils/api';
import oc from 'open-color';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { IPost } from '@typings/post';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { PencilAltIcon } from '@heroicons/react/outline';

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
  // ? url에 따라서 키가 바뀌기 때문에 리패치가 된다
  const { status, data } = useQuery(['query', url], () => getPostList(url));
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (status === 'loading') {
    return <PostListBlock>로딩중......</PostListBlock>;
  }

  if (status === 'error' || !data) {
    return <PostListBlock>데이터 없어요 혹은 에러</PostListBlock>;
  }

  return (
    <div className="px-4 mx-auto mt-4 md:max-w-screen-lg">
      <div className="fixed px-5 py-5 transition bg-indigo-400 rounded-full opacity-50 cursor-pointer right-10 bottom-20 hover:bg-indigo-500 hover:opacity-80 ">
        {isLoggedIn && (
          <Link to="/write">
            <PencilAltIcon className="h-8" />
          </Link>
        )}
      </div>
      <div>
        {data.posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default PostList;
