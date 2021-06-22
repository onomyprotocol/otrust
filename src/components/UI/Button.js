import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  height: 2.25rem;
  width: ${p => (p.width ? p.width + 'px' : 'auto')};

  background-color: ${props => props.theme.colors.bgLight};
  border: none;
  border-radius: 1.25rem;

  font-size: 1rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 400;

  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.light};

    color: ${props => props.theme.colors.textLight};
  }
`;

export const AccentButton = styled.button`
  height: 2.25rem;
  width: ${p => (p.width ? p.width + 'px' : 'auto')};
  padding: 0 1.25rem;

  background-color: ${props => props.theme.colors.primary};
  border: none;
  border-radius: 1.25rem;

  font-size: 1rem;
  color: #fff;
  font-weight: 500;

  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background-color: #5c8ddb;

    color: #fff;
  }
`;
export const SupportButton = styled(StyledButton)`
  border-radius: 0.5rem;
  background-color: #ffe598;

  font-size: 0.75rem;
  font-weight: 600;
  color: #36364b;

  outline: none;
`;

export const StyledInvisibleButton = styled.button`
  padding: 0;

  background-color: transparent;
  border: none;
  outline: none;

  cursor: pointer;
`;

export function Button({ width, children }) {
  return <StyledButton width={width}>{children}</StyledButton>;
}

export function InvisibleButton({ children }) {
  return <StyledInvisibleButton>{children}</StyledInvisibleButton>;
}
