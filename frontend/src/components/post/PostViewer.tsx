import Responsive from '@components/common/Responsive';
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

const SubInfo = styled.div`
  margin-top: 1rem;
  color: ${oc.gray[6]};

  /* span 사이에 가운뎃점 문자 보여주기 */
  span + span::before {
    color: ${oc.gray[5]};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7'; /* 가운뎃점 문자 */
  }
`;

const Tags = styled.div`
  margin-top: 0.5rem;
  .tag {
    display: inline-block;
    color: ${oc.cyan[7]};
    text-decoration: none;
    margin-right: 0.5rem;
    &:hover {
      color: ${oc.cyan[6]};
    }
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
  const { status, data } = useQuery('getPost', () => getPost(postId));

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
        <SubInfo>
          <span>
            <b>{postData.user.nickname}</b>
          </span>
          <span>{new Date(postData.updatedAt).toLocaleDateString()}</span>
        </SubInfo>
        <Tags>
          {postData.tags.map((tag) => (
            <div className="tag" key={tag}>
              #{tag}
            </div>
          ))}
        </Tags>
      </PostHead>
      <PostContent dangerouslySetInnerHTML={{ __html: postData.content }} />
    </PostViewerBlock>
  );
}

export default PostViewer;
