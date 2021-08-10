import styled from '@emotion/styled';
import React from 'react';
import oc from 'open-color';
import { css } from '@emotion/react';
import { Link, LinkProps } from 'react-router-dom';

const buttonStyle = css`
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

  &:disabled {
    background-color: ${oc.gray[3]};
    color: ${oc.gray[5]};
    cursor: not-allowed;
  }
`;

// const StyledButton = styled.button<{ fullWidth?: boolean; cyan?: boolean }>`
const StyledButton = styled.button<{ fullWidth?: boolean; cyan?: boolean }>`
  ${buttonStyle}

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${(props) =>
    props.cyan &&
    css`
      background-color: ${oc.cyan[5]};
      &:hover {
        background-color: ${oc.cyan[4]};
      }
    `}
`;

// const StyledLink = styled(Link)<{ fullWidth?: boolean; cyan?: boolean }>`
const StyledLink = styled(
  ({
    cyan,
    fullWidth,
    to,
    ...rest
  }: {
    cyan?: boolean;
    fullWidth?: boolean;
    to: string;
    rest?: LinkProps;
  }) => <Link to={to} {...rest} />
)`
  ${buttonStyle}

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${(props) =>
    props.cyan &&
    css`
      background-color: ${oc.cyan[5]};
      &:hover {
        background-color: ${oc.cyan[4]};
      }
    `}
`;

interface IButton {
  cyan?: boolean;
  to?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

function Button({ children, to, ...rest }: IButton) {
  if (to) {
    return (
      <StyledLink to={to} {...rest}>
        {children}
      </StyledLink>
    );
  }

  return <StyledButton {...rest}>{children}</StyledButton>;
}

export default Button;
