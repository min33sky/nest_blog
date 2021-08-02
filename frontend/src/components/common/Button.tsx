import styled from '@emotion/styled';
import React from 'react';
import oc from 'open-color';

const Container = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background-color: ${oc.gray[8]};
  &:hover {
    background-color: ${oc.gray[6]};
  }
`;

function Button({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}

export default Button;
