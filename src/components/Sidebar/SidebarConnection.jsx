import React from 'react';
import styled from 'styled-components';

import { ConnectionStatus } from '../UI';
import { responsive } from 'theme/constants';

const Connection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 40px;

  @media screen and (max-width: ${responsive.laptop}) {
    padding: 24px;
  }

  @media screen and (max-width: ${responsive.tablet}) {
    flex-direction: row;
    gap: 40px;
  }

  @media screen and (max-width: ${responsive.smartphoneLarge}) {
    display: none;
  }
`;

const ConnectionRow = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: ${responsive.tablet}) {
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
  }

  > strong {
    font-weight: 400;
    color: ${props => props.theme.colors.textSecondary};
  }

  > span {
    font-weight: 500;
  }
`;

export default function SidebarConnection({ active, error, chainId, blockNumber }) {
  return (
    <Connection>
      <ConnectionRow>
        <strong>Connection</strong>
        <ConnectionStatus>{active ? 'Connected' : error ? 'Error' : 'Loading'}</ConnectionStatus>
      </ConnectionRow>
      <ConnectionRow>
        <strong>Chain Id</strong>
        <span>{chainId ?? ''}</span>
      </ConnectionRow>
      <ConnectionRow>
        <strong>Block Number</strong>
        <span>{blockNumber ? blockNumber.toFixed(0) : ''}</span>
      </ConnectionRow>
    </Connection>
  );
}
