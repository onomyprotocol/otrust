import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 80vw;
  max-width: 100%;
  margin: 0 auto;

  box-sizing: border-box;
`;

const FullBackgroundStyledContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  background-image: url(${props => props.img});
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
`;

export function Container({ children }) {
  return <StyledContainer>{children}</StyledContainer>;
}

export function FullBackgroundContainer({ img, children }) {
  return <FullBackgroundStyledContainer img={img}>{children}</FullBackgroundStyledContainer>;
}
