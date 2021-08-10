import Responsive from '@components/common/Responsive';
import SubInfo from '@components/common/SubInfo';
import Tags from '@components/common/Tags';
import styled from '@emotion/styled';
import { getPost } from '@utils/api';
import oc from 'open-color';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;

const PostHead = styled.div`
  border-bottom: 1px solid ${oc.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${oc.gray[8]};
`;

interface IPostParams {
  nickname: string;
  postId: string;
}

/**
 * 포스트 뷰어
 * @returns
 */
function PostViewer() {
  const { postId } = useParams<IPostParams>();
  const { status, data } = useQuery(['getPost', postId], () => getPost(postId));

  if (status === 'loading') {
    return <div>게시물 로딩 중....</div>;
  }

  if (status === 'error' || !data) {
    return <div>게시물이 없어요</div>;
  }

  const { data: postData } = data;

  return (
    <PostViewerBlock>
      <PostHead>
        <h1>{postData.title}</h1>
        <SubInfo
          nickname={postData.user.nickname}
          publishedDate={postData.updatedAt}
          hasMarginTop
        />
        <Tags tags={postData.tags} />
      </PostHead>
      <PostContent dangerouslySetInnerHTML={{ __html: postData.content }} />
    </PostViewerBlock>
  );
}

export default PostViewer;
