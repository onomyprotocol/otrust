import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';

import LineChart from "./BondLineChart";
import HistoricalChart from "./D3HistoricalChart";
import CandelChart from "./D3CandelChart";
import MenuButtons from '../MenuButtons';
import { ChartPanel } from "./Style";
import { useSwap } from 'context/SwapContext';
import { NOMsupplyETH, priceAtSupply, supplyAtPrice } from 'utils/bonding';
import Swap from 'components/Swap';
import { ChainContext } from 'context/chain/ChainContext';


import { useQuery } from '@apollo/client'
import { gql } from 'apollo-boost'

const ChartWrapper = styled.div`
    height: 100%;
    min-width: 30rem;
    max-width: 60%;
    flex-basis: auto; /* default value */
    flex-grow: 1;
    background-color: ${props => props.theme.colors.bgNormal};
`
const HeaderWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const BuySellWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
`

function supplyToArray(supBegin, supEnd) {
  var dataArray = []
  const dif = supEnd - supBegin
  const n = 100
  for (var i = 0; i < n; i++) {
    dataArray.push(
      {
        x: supBegin + dif * i / n,
        y: priceAtSupply(supBegin + dif * i / n)
      }
    );
  }

  return dataArray
}

function labelArray(supBegin, supEnd) {
  const paymentETH = NOMsupplyETH(supEnd, supBegin)
  const priceAvg = paymentETH / (supEnd - supBegin)
  const supAvg = supplyAtPrice(priceAvg)
  return { paymentETH, supAvg, priceAvg }
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

  const { theme } = useContext(ChainContext);

  //buttons on the topLeft header
  const leftHeaderDefault = [
    {
      id: 'BondingCurve',
      text: 'Bonding Curve Chart',
      status: true
    }, {
      id: 'HistoricalChart',
      text: 'Historical Chart',
      status: false
    }, {
      id: 'CandelView',
      text: 'Candel View',
      status: false
    }
  ]

  const historicalHeaderDefault = [
    {
      id: 'Day',
      text: 'Day',
      status: true
    }, {
      id: 'Week',
      text: 'Week',
      status: false
    }, {
      id: 'Month',
      text: 'Month',
      status: false
    }, {
      id: 'Quarter',
      text: 'Year',
      status: false
    }, {
      id: 'AllTime',
      text: 'All Time',
      status: false
    }
  ]

  const candelHeaderDefault = [
    {
      id: '15m',
      text: '15m',
      status: true,
    }, {
      id: '1H',
      text: '1H',
      status: false
    }, {
      id: '4H',
      text: '4H',
      status: false
    }, {
      id: '1D',
      text: '1D',
      status: false
    }, {
      id: '3D',
      text: '3D',
      status: false
    }, {
      id: '1W',
      text: '1W',
      status: false
    }
  ]

  const { swapSupply } = useSwap()


  const [data, setData] = useState(supplyToArray(0, 100000000))
  const [areaData, setAreaData] = useState(supplyToArray(0, 100000000))

  const [labelData, setLabelData] = useState('')

  // eslint-disable-next-line
  const [leftHeaderId, setLeftHeaderId] = useState('1')
  const [leftHeader, setLeftHeader] = useState(leftHeaderDefault)

  const [historicalHeaderId, setHistoricalHeaderId] = useState('1')
  const [historicalHeader, setHistoricalHeader] = useState(historicalHeaderDefault)

  const [candelHeaderId, setCandelHeaderId] = useState('1')
  const [candelHeader, setCandelHeader] = useState(candelHeaderDefault)

  const [isBuyButton, setIsBuyButton] = useState(true)

  useEffect(() => {
    
    if (swapSupply[1]) {
      var digitsUpper = Math.floor(Math.log10(swapSupply[1]))
      // upperBound = 10**(digitsUpper + 1)
      const upperBound = (Math.round(swapSupply[1] / 10 ** digitsUpper) + 1) * 10 ** digitsUpper
      const lowerBound = 0
      setData(
        supplyToArray(
          lowerBound,
          upperBound
        )
      )
      setAreaData(supplyToArray(swapSupply[0], swapSupply[1]))
      setLabelData(labelArray(swapSupply[0], swapSupply[1]))
    }
  }, [swapSupply])


  //When clicking Header buttons
  const handleLeftHeaderChange = (leftHeader, clickedLeftId) => {
    setLeftHeaderId(clickedLeftId)
    setLeftHeader(leftHeader)
  }

  const handleHistoricalHeaderChange = (headerbuttons, clickedId) => {
    console.log('historical', clickedId, headerbuttons)
    setHistoricalHeaderId(clickedId)
    setHistoricalHeader(headerbuttons)
  }

  const handleCandelHeaderChange = (headerbuttons, clickedId) => {
    console.log('candel', clickedId, headerbuttons)
    setCandelHeaderId(clickedId)
    setCandelHeader(headerbuttons)
  }


  //BuySellButtons 
  const btnBuyGradient = `linear-gradient(to right, #${theme.colors.btnBuyLight}, #${theme.colors.btnBuyNormal})`

  const btnSellGradient = `linear-gradient(to right, #${theme.colors.btnSellLight}, #${theme.colors.btnSellNormal})`

  const handleBtnClick = (value) => {
    value === 'ETH' ? setIsBuyButton(true) : setIsBuyButton(false)
  }


  return (
    <ChartWrapper>
      <ChartPanel>
        <HeaderWrapper>
          <MenuButtons onButtonChange={handleLeftHeaderChange} menuButtons={leftHeader} />

          {leftHeader[1] && leftHeader[1].status && <MenuButtons onButtonChange={handleHistoricalHeaderChange} menuButtons={historicalHeader} />}

          {leftHeader[2] && leftHeader[2].status && <MenuButtons onButtonChange={handleCandelHeaderChange} menuButtons={candelHeader} />}
        </HeaderWrapper>

        {leftHeader[0] && leftHeader[0].status &&
          <LineChart data={data} areaData={areaData} labelData={labelData} />}

        {leftHeader[1] && leftHeader[1].status && <HistoricalChart historicalHeader={historicalHeader} historicalHeaderId={historicalHeaderId} />}

        {leftHeader[2] && leftHeader[2].status &&
          <CandelChart candelHeader={candelHeader} candelHeaderId={candelHeaderId} />}
      </ChartPanel>
      <BuySellWrapper >
        <Swap colorGradient={btnBuyGradient} text='Buy NOM' isBuyButton={isBuyButton} onInputChange={handleBtnClick} />
        <Swap colorGradient={btnSellGradient} text='Sell NOM' isBuyButton={!isBuyButton} onInputChange={handleBtnClick} />
      </BuySellWrapper>

    </ChartWrapper>
  )
}