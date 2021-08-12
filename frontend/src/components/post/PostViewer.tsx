import SubInfo from '@components/common/SubInfo';
import Tags from '@components/common/Tags';
import PostActionButtons from '@components/post/PostActionButtons';
import { PostViewerBlock, PostHead, PostContent } from '@components/post/PostViewer.style';
import { getUserStatus } from '@pages/Auth/Login/LoginPage/LoginPage';
import { clearEditor } from '@store/post/post.slice';
import { RootState } from '@store/store';
import { getPost, removePost } from '@utils/api';
import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useMutation, useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface IPostParams {
  nickname: string;
  postId: string;
}

/**
 * 포스트 뷰어
 * @returns
 */
function PostViewer() {
  const dispatch = useDispatch();
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
        dispatch(clearEditor);
        history.replace(`/`);
      } catch (err) {
        toast.error('게시물 삭제 실패 :<', { position: 'bottom-center' });
      }
    }
  }, [data, removeMutation, history, dispatch]);

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
      <Helmet>
        <title>{postData.title} - NEST BLOG</title>
      </Helmet>

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
