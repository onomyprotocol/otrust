import React, { useState } from "react";
import styled from "styled-components";

import { responsive } from "theme/constants";

import BondLineChart from "components/Chart/BondLineChart";
import HistoricalChart from "components/Chart/D3HistoricalChart";
import CandelChart from "components/Chart/D3CandelChart";

import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";

import {
  historicalHeaderDefault,
  candelHeaderDefault,
} from "components/Chart/defaultChartData";


const ChartWrapper = styled.div`
  padding: 20px;

  background-color: ${(props) => props.theme.colors.bgDarken};
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

  background-color: ${(props) => props.theme.colors.bgHighlightBorder};
  border-radius: 6px;
  border: none;

  color: ${(props) => props.theme.colors.textPrimary};
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
`

export default function Chart() {
    // useQuery Apollo Client Hook to get data from TheGraph
    const { error, loading, bondData } = useQuery(TRANSACTIONS_QUERY)

    const [chartType, setChartType] = useState("bondingCurve");

    const [historicalHeaderId] = useState("1");
    const [historicalHeader] = useState(historicalHeaderDefault);

    const [candelHeaderId] = useState("1");
    const [candelHeader] = useState(candelHeaderDefault);

    const renderChart = (type) => {
        switch (type) {
        case "historicalChart":
            return (
            <HistoricalChart
                historicalHeader={historicalHeader}
                historicalHeaderId={historicalHeaderId}
                bondData={bondData}
                error={error}
                loading={loading}
            />
            );
        case "candleView":
            return (
            <CandelChart
                candelHeader={candelHeader}
                candelHeaderId={candelHeaderId}
            />
            );
        case "bondingCurve":
        default:
            return (
            <BondLineChart />
            );
        }
    };

    return (
        <ChartWrapper>
          <ChartHeader>
            <ChartTypeBtn onClick={() => setChartType("bondingCurve")}>
              Bonding Curve Chart
            </ChartTypeBtn>
            <ChartTypeBtn onClick={() => setChartType("historicalChart")}>
              Historical Chart
            </ChartTypeBtn>
            <ChartTypeBtn onClick={() => setChartType("candleView")}>
              Candle View
            </ChartTypeBtn>
          </ChartHeader>
          {renderChart(chartType)}
        </ChartWrapper>
    )
}