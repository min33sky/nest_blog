import styled from '@emotion/styled';
import React from 'react';
import queryString from 'query-string';
import Button from '@components/common/Button';
import { useQuery } from 'react-query';
import { getPostList } from '@utils/api';

const PaginationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

const PageNumber = styled.div``;

const buildLink = ({ nickname, tag, page }: { nickname?: string; tag?: string; page?: number }) => {
  const query = queryString.stringify({ tag, page });
  return nickname ? `/@${nickname}?${query}` : `/?${query}`;
};

interface IPagination {
  url: string;
  parsed: {
    page?: string;
    tag?: string;
    nickname?: string;
  };
}

function Pagination({ url, parsed }: IPagination) {
  const { status, data } = useQuery(['query', url], () => getPostList(url));

  if (status === 'loading') {
    return <p>로딩중...</p>;
  }

  if (status === 'error' || !data) {
    return <p>에러</p>;
  }

  const {
    data: { totalPostCount, pageNum },
  } = data;
  const { nickname, tag } = parsed;
  const lastPage = Math.ceil(totalPostCount / 5);

  return (
    <PaginationBlock>
      <Button
        disabled={pageNum === 1}
        to={pageNum === 1 ? undefined : buildLink({ nickname, tag, page: pageNum - 1 })}
      >
        이전
      </Button>
      <PageNumber>{pageNum}</PageNumber>
      <Button
        disabled={pageNum === lastPage}
        to={
          pageNum === lastPage ? undefined : buildLink({ nickname, tag, page: Number(pageNum) + 1 })
        }
      >
        이전
      </Button>
    </PaginationBlock>
  );
}

export default Pagination;
