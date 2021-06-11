import styled from 'styled-components';

import { borderWidth, borderRadius } from 'context/responsive/cssSizes';

const adjustedRadius = `${parseFloat(borderRadius.slice(0, -3)) / 2}rem`;
const adjustedBorderWidth = `${parseFloat(borderWidth.slice(0, -3)) * 5}rem`;

export const ChartPanel = styled.div`
  padding: 1.5rem 2rem;

  border: ${adjustedBorderWidth} solid ${props => props.theme.colors.bgNormal};
  background-color: ${props => props.theme.colors.bgDarken};
  opacity: 1;

  border-radius: ${adjustedRadius};

  box-sizing: border-box;
`;
