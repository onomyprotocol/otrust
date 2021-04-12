import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";

import { NOMsupplyETH, priceAtSupply, supplyAtPrice } from "utils/bonding";
import { useSwap } from "context/SwapContext";
import { ChainContext } from 'context/chain/ChainContext';
import {
  leftHeaderDefault,
  historicalHeaderDefault,
  candelHeaderDefault,
} from "./defaultChartData";
import { responsive } from "theme/constants";

import { Panel } from "components/UI";
import Swap from "components/Swap";
import LineChart from "./D3LineChart";
import HistoricalChart from "./D3HistoricalChart";
import CandelChart from "./D3CandelChart";
import MenuButtons from '../MenuButtons';


const ContentLayout = styled.div`
  display: grid;
  grid-template-rows: 550px auto;
  @media screen and (max-width: ${responsive.laptop}) {
    grid-template-rows: 400px auto;
  }
`

const ChartWrapper = styled.div`
  padding: 20px;
  background-color: ${(props) => props.theme.colors.bgDarken};
  border-radius: 4px;
`

const ExchangeWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 24px 0;
`

const VerticalLine = styled.div`
  width: 0.15rem;
  background-color: ${(props) => props.theme.colors.bgHighlightBorder};
  height: 90%;
  @media only screen and (max-width: ${responsive.smartphone}) {
    display: none;
  }
`

const HeaderWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

function supplyToArray(supBegin, supEnd) {
  var dataArray = [];
  const dif = supEnd - supBegin;
  const n = 100;
  for (var i = 0; i < n; i++) {
    dataArray.push({
      x: supBegin + (dif * i) / n,
      y: priceAtSupply(supBegin + (dif * i) / n),
    });
  }

  return dataArray;
}

function labelArray(supBegin, supEnd) {
  const paymentETH = NOMsupplyETH(supEnd, supBegin);
  const priceAvg = paymentETH / (supEnd - supBegin);
  const supAvg = supplyAtPrice(priceAvg);
  return { paymentETH, supAvg, priceAvg };
}

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
            timestamp
        }
    }
`


export default function D3Chart(onButtonChange) {
 
  const { swapSupply } = useSwap();
  const [data, setData] = useState(supplyToArray(0, 100000000));
  const [areaData, setAreaData] = useState(supplyToArray(0, 100000000));
  const [labelData, setLabelData] = useState("");

  useEffect(() => {
    if (swapSupply[1]) {
      var digitsUpper = Math.floor(Math.log10(swapSupply[1]));
      // upperBound = 10**(digitsUpper + 1)
      const upperBound =
        (Math.round(swapSupply[1] / 10 ** digitsUpper) + 1) * 10 ** digitsUpper;
      const lowerBound = 0;
      setData(supplyToArray(lowerBound, upperBound));
      setAreaData(supplyToArray(swapSupply[0], swapSupply[1]));
      setLabelData(labelArray(swapSupply[0], swapSupply[1]));
    }
  }, [swapSupply]);


  // useQuery Apollo Client Hook to get data 
  const txQuery = useQuery(TRANSACTIONS_QUERY)
  // Here is console.log of the historical tx data
  useEffect(() => {
    console.log("Data: ", txQuery.data)
  }, [txQuery.data])


  //Menu Header Buttons (Left Header and right Header)
  const [leftHeader, setLeftHeader] = useState(leftHeaderDefault)
 
  const [historicalHeader, setHistoricalHeader] = useState(historicalHeaderDefault)

  const [candelHeader, setCandelHeader] = useState(candelHeaderDefault)

  const handleLeftHeader = (leftHeader) => {
    setLeftHeader(leftHeader)
  }

  const handleHistoricalHeader = (headerbuttons) => {
    console.log('historical', headerbuttons)
    setHistoricalHeader(headerbuttons)
  }

  const handleCandelHeader = (headerbuttons) => {
    console.log('candel', headerbuttons)
    setCandelHeader(headerbuttons)
  }

  const MenuHeader = () => {
    return (
      <HeaderWrapper>
        <MenuButtons onButtonChange={handleLeftHeader} menuButtons={leftHeader} />

        {leftHeader.data[1] && leftHeader.data[1].status && <MenuButtons onButtonChange={handleHistoricalHeader} menuButtons={historicalHeader} />}

        {leftHeader.data[2] && leftHeader.data[2].status && <MenuButtons onButtonChange={handleCandelHeader} menuButtons={candelHeader} />}
      </HeaderWrapper>
    )    
  }


  //BuySellComponents
  const [isBuyButton, setIsBuyButton] = useState(true)
  const { theme } = useContext(ChainContext);
 
  const btnBuyGradient = `linear-gradient(to right, ${theme.colors.btnBuyLight}, ${theme.colors.btnBuyNormal})`
  const btnSellGradient = `linear-gradient(to right, ${theme.colors.btnSellLight}, ${theme.colors.btnSellNormal})`

  const handleBtnClick = (value) => {
    value === 'ETH' ? setIsBuyButton(true) : setIsBuyButton(false)
  }


  return (
    <Panel>
      <ContentLayout>
        <ChartWrapper>
          <MenuHeader />
          {leftHeader.data[0] && leftHeader.data[0].status && <LineChart data={data} areaData={areaData} labelData={labelData} />}

          {leftHeader.data[1] && leftHeader.data[1].status && <HistoricalChart historicalHeader={historicalHeader} />}

          {leftHeader.data[2] && leftHeader.data[2].status && <CandelChart candelHeader={candelHeader} />}
        </ChartWrapper>

        <ExchangeWrapper >
          <Swap colorGradient={btnBuyGradient} text='Buy NOM' isBuyButton={isBuyButton} onInputChange={handleBtnClick} />
          <VerticalLine />
          <Swap colorGradient={btnSellGradient} text='Sell NOM' isBuyButton={!isBuyButton} onInputChange={handleBtnClick} />
        </ExchangeWrapper>
      </ContentLayout>
    </Panel>
  );
}
