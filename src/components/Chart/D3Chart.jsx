import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";

import { priceAtSupply } from "utils/bonding";
import { useSwap } from "context/SwapContext";
import { ChainContext } from 'context/chain/ChainContext';
import { responsive } from "theme/constants";
import D3ChartComplex from './D3ChartComplex';
import { Panel } from "components/UI";
import Swap from "components/Swap";

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


export default function D3Chart() {
 
  const { swapSupply } = useSwap();
  const [data, setData] = useState(supplyToArray(0, 100000000));
  const [areaData, setAreaData] = useState(supplyToArray(0, 100000000));
 
  useEffect(() => {
    if (swapSupply[1]) {
      var digitsUpper = Math.floor(Math.log10(swapSupply[1]));
      // upperBound = 10**(digitsUpper + 1)
      const upperBound =
        (Math.round(swapSupply[1] / 10 ** digitsUpper) + 1) * 10 ** digitsUpper;
      const lowerBound = 0;
      setData(supplyToArray(lowerBound, upperBound));
      setAreaData(supplyToArray(swapSupply[0], swapSupply[1]));
    }
  }, [swapSupply]);


  // useQuery Apollo Client Hook to get data 
  const txQuery = useQuery(TRANSACTIONS_QUERY)
  // Here is console.log of the historical tx data
  useEffect(() => {
    //console.log("Data: ", txQuery.data)
  }, [txQuery.data])
 

  //BuySellComponents for NOM trading
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
          <D3ChartComplex 
          data={data}
          areaData={areaData}
          />
        </ChartWrapper>

        <ExchangeWrapper >
          <Swap 
           colorGradient={btnBuyGradient} text='Buy NOM' 
           isBuyButton={isBuyButton} 
           onInputChange={handleBtnClick} 
          />
          <VerticalLine />
          <Swap 
           colorGradient={btnSellGradient} text='Sell NOM' 
           isBuyButton={!isBuyButton} onInputChange={handleBtnClick} 
          />
        </ExchangeWrapper>
      </ContentLayout>
    </Panel>
  );
}
