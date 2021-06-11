import styled from 'styled-components';

import { responsive } from 'theme/constants';

export const Panel = styled.div`
  padding: 4px;

  background-color: ${props => props.theme.colors.bgNormal};
  border-radius: 6px;

  box-sizing: border-box;

  @media screen and (max-width: ${responsive.smartphoneLarge}) {
    border-radius: 0;
    padding: 0;
  }
`;
