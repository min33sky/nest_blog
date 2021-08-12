import Responsive from '@components/common/Responsive';
import styled from '@emotion/styled';
import oc from 'open-color';

export const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;

export const PostHead = styled.div`
  border-bottom: 1px solid ${oc.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

export const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${oc.gray[8]};
`;
