import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';

import { responsive } from 'theme/constants';
import BondLineChart from 'components/Chart/BondLineChart';
import LineChart from 'components/Chart/HistoricalLineChart';
import CandelChart from 'components/Chart/CandleChart';
import { lineHeaderDefault, candelHeaderDefault } from 'components/Chart/defaultChartData';

const ChartWrapper = styled.div`
  padding: 20px;

  background-color: ${props => props.theme.colors.bgDarken};
  border-radius: 4px;
`;

const ChartHeader = styled.header`
  @media screen and (max-width: ${responsive.smartphoneLarge}) {
    display: none;
  }
`;

const ChartTypeBtn = styled.button`
  height: 50px;
  padding: 16px 24px;

  background-color: ${props => props.theme.colors.bgHighlightBorder};
  border-radius: 6px;
  border: none;

  color: ${props => props.theme.colors.textPrimary};
  font-size: 14px;

  cursor: pointer;

  @media screen and (max-width: ${responsive.laptop}) {
    height: 44px;
    padding: 12px 20px;
  }

  & + & {
    margin-left: 1em;
  }
`;

const TRANSACTIONS_QUERY = gql`
  query transactions {
    transactionRecords {
      id
      senderAddress
      amountNOM
      amountETH
      price
      supply
      buyOrSell
      slippage
      timestamp
    }
  }
`;

export default function Chart() {
  // useQuery Apollo Client Hook to get data from TheGraph
  const { error, loading, data } = useQuery(TRANSACTIONS_QUERY);

  const [chartType, setChartType] = useState('bondingCurve');

  const [lineHeaderId] = useState('1');
  const [lineHeader] = useState(lineHeaderDefault);

  const [candelHeaderId] = useState('1');
  const [candelHeader] = useState(candelHeaderDefault);

  useEffect(() => {
    console.log('Error: ', error);
    console.log('Loading: ', loading);
    console.log('Bond Data: ', data);
  }, [error, loading, data]);

  const renderChart = type => {
    switch (type) {
      case 'lineChart':
        return (
          <LineChart
            lineHeader={lineHeader}
            lineHeaderId={lineHeaderId}
            bondData={data}
            error={error}
            loading={loading}
          />
        );
      case 'candleView':
        return <CandelChart candelHeader={candelHeader} candelHeaderId={candelHeaderId} />;
      case 'bondingCurve':
      default:
        return <BondLineChart />;
    }
  };

  return (
    <ChartWrapper>
      <ChartHeader>
        <ChartTypeBtn onClick={() => setChartType('bondingCurve')}>Bonding Curve Chart</ChartTypeBtn>
        <ChartTypeBtn onClick={() => setChartType('lineChart')}>Line Chart</ChartTypeBtn>
        <ChartTypeBtn onClick={() => setChartType('candleView')}>Candle View</ChartTypeBtn>
      </ChartHeader>
      {renderChart(chartType)}
    </ChartWrapper>
  );
}
