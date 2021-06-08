import styled from 'styled-components';

import { responsive } from 'theme/constants';

export const Container = styled.div`
  max-width: 100%;
  width: 1600px;
  padding: 0 80px;
  margin: 0 auto;

  @media screen and (max-width: ${responsive.laptop}) {
    width: 100%;
  }

  @media screen and (max-width: ${responsive.laptopSmall}) {
    padding: 0 20px;
  }

  @media screen and (max-width: ${responsive.smartphoneLarge}) {
    padding: 0;
  }
`;
