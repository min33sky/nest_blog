import Button from '@components/common/Button';
import Responsive from '@components/common/Responsive';
import SubInfo from '@components/common/SubInfo';
import Tags from '@components/common/Tags';
import styled from '@emotion/styled';
import oc from 'open-color';
import React from 'react';

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

const PostItem = () => {
  return (
    <PostItemBlock>
      <h2>제목</h2>
      <SubInfo nickname="닉네임" publishedDate="2000-11-11" />
      <Tags tags={['태그1', '태그2', '태그3']} />
      <p>포스트 내용의 일부분....</p>
    </PostItemBlock>
  );
};

function PostList() {
  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        <Button cyan to="/write">
          새 글 작성하기
        </Button>
      </WritePostButtonWrapper>
      <div>
        <PostItem />
        <PostItem />
        <PostItem />
      </div>
    </PostListBlock>
  );
}

export default PostList;
