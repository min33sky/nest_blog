/* eslint-disable no-undef */
import Responsive from '@components/common/Responsive';
import Editor from '@components/write/Editor';
import TagBox from '@components/write/TagBox';
import WriteActionButtons from '@components/write/WriteActionButtons';
import { loadPost } from '@store/post/post.slice';
import { getPost } from '@utils/api';
import { deduplicateAndSortIssues } from 'fork-ts-checker-webpack-plugin/lib/issue';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

/**
 * * 포스트 작성 및 수정 페이지
 * * [/write:postId, /write]
 * @returns
 */
function WritePage() {
  const dispatch = useDispatch();
  const { postId } = useParams<{ postId: string }>();

  /**
   * 포스트 아이디가 있으면 (수정 모드일 경우)
   * 게시글을 패치해서 스토어에 기존 값으로 초기화하기
   */

  const { status, data } = useQuery(['getPost', postId], () => getPost(postId), {
    enabled: !!postId,
  });

  useEffect(() => {
    if (data) {
      dispatch(
        loadPost({
          title: data.data.title,
          content: data.data.content,
          tags: data.data.tags,
        })
      );
    }
  }, [data, dispatch]);

  return (
    <Responsive>
      <Editor />
      <TagBox />
      <WriteActionButtons postId={postId} />
    </Responsive>
  );
}

export default WritePage;
