import Responsive from '@components/common/Responsive';
import SubInfo from '@components/common/SubInfo';
import Tags from '@components/common/Tags';
import PostActionButtons from '@components/post/PostActionButtons';
import styled from '@emotion/styled';
import { getUserStatus } from '@pages/Auth/Login/LoginPage/LoginPage';
import { RootState } from '@store/store';
import { getPost, removePost } from '@utils/api';
import oc from 'open-color';
import React, { useCallback } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

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
  const token = useSelector((state: RootState) => state.auth.token);
  const history = useHistory();
  const { data: userData } = useQuery('userStatus', () => getUserStatus(token), {
    enabled: !!token, // ? 토큰이 없으면 No Fetch~
  });

  const { status, data } = useQuery(['getPost', postId], () => getPost(postId));
  const removeMutation = useMutation(removePost);

  const onUpdate = useCallback(() => {
    history.push(`/write/${data?.data._id}`);
  }, [data?.data._id, history]);

  const onRemove = useCallback(async () => {
    if (data) {
      try {
        await removeMutation.mutateAsync(data.data._id);
        history.replace(`/`);
      } catch (err) {
        console.error(err);
      }
    }
  }, [data, removeMutation, history]);

  if (status === 'loading') {
    return <div>게시물 로딩 중....</div>;
  }

  if (status === 'error' || !data) {
    return <div>게시물이 없어요</div>;
  }

  const { data: postData } = data;
  const ownPost = userData?.data._id === postData.user._id;

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

      {ownPost && <PostActionButtons onUpdate={onUpdate} onRemove={onRemove} />}

      <PostContent dangerouslySetInnerHTML={{ __html: postData.content }} />
    </PostViewerBlock>
  );
}

export default PostViewer;
