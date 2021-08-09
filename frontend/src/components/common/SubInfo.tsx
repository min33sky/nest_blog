import React from 'react';
import oc from 'open-color';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const SubInfoBlock = styled.div<{ hasMarginTop: boolean }>`
  ${(props) =>
    props.hasMarginTop &&
    css`
      margin-top: 1rem;
    `}

  color: ${oc.gray[6]};

  /* span 사이에 가운뎃점 문자 보여주기 */
  span + span::before {
    color: ${oc.gray[4]};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7'; /* 가운뎃점 문자 */
  }
`;

interface ISubInfo {
  nickname: string;
  publishedDate: string;
  hasMarginTop?: boolean;
}

function SubInfo({ nickname, publishedDate, hasMarginTop = false }: ISubInfo) {
  return (
    <SubInfoBlock hasMarginTop={hasMarginTop}>
      <span>
        <b>
          <Link to={`/@${nickname}`}>{nickname}</Link>
        </b>
      </span>
      <span>{new Date(publishedDate).toLocaleDateString()}</span>
    </SubInfoBlock>
  );
}

export default SubInfo;
