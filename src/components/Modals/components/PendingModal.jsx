import React, { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'bignumber.js';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import LoadingSpinner from 'components/UI/LoadingSpinner';
import { Metamask } from 'components/Modals/Icons';
import { lighten } from 'polished';
import TransactionCompletedModal from 'components/Modals/components/TransactionCompletedModal';
import TransactionFailedModal from 'components/Modals/components/TransactionFailedModal';

import { format18, parse18 } from 'utils/math';
import { useExchange, useUpdateExchange } from 'context/exchange/ExchangeContext';
import { useModal } from 'context/modal/ModalContext';
import { BondingCont, NOMCont } from 'context/chain/contracts';
import * as Modal from '../styles';

const TransactionDetailsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 16px;
  }

  span {
    font-weight: 400;
    color: ${props => props.theme.colors.textThirdly};
  }

  strong {
    font-weight: 500;
  }
`;

const WalletIcon = styled.div`
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${props => props.theme.colors.bgDarken};

  svg {
    width: 24px;
    height: 24px;
  }
`;

// const FeeWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;

//   margin-top: 16px;

//   color: ${props => props.theme.colors.textThirdly};

//   strong {
//     color: ${props => props.theme.colors.textPrimary};
//   }
// `;

const OptionsWrapper = styled.section`
  padding: 32px 32px;

  border-top: 1px solid ${props => props.theme.colors.bgHighlightBorder};
`;

const OptionCaption = styled.p`
  margin: 0 0 12px;
  color: ${props => props.theme.colors.textThirdly};
`;

const SlippageDesc = styled.p`
  margin: 16px 0 0;
  color: ${props => props.theme.colors.textSecondary};
`;

const Options = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  margin: 12px 0 16px;
`;

const OptionBtn = styled.button`
  padding: 12px 16px;

  background-color: ${props => (props.active ? props.theme.colors.bgHighlightBorder : 'transparent')};
  border: 1px solid ${props => props.theme.colors.bgHighlightBorder};
  border-radius: 22px;

  font-size: 14px;
  font-weight: 500;
  color: ${props => (props.active ? props.theme.colors.textPrimary : props.theme.colors.textSecondary)};

  &:hover {
    background-color: ${props => lighten(0.1, props.theme.colors.bgHighlightBorder)};
  }

  &:active {
    background-color: ${props => lighten(0.1, props.theme.colors.bgHighlightBorder)};
  }
`;

const limitOptions = [
  {
    id: 0,
    text: 'No limit',
    value: new BigNumber(1000),
  },
  {
    id: 1,
    text: '1%',
    value: new BigNumber(100),
  },
  {
    id: 2,
    text: '2.5%',
    value: new BigNumber(250),
  },
  {
    id: 3,
    text: '5%',
    value: new BigNumber(500),
  },
];

const gasOptions = [
  {
    id: 0,
    text: '0 (Standard)',
  },
  {
    id: 1,
    text: '0 (Fast)',
  },
  {
    id: 2,
    text: '0 (Instant)',
  },
];

export default function PendingModal({ type = 'selling' }) {
  const { account, library } = useWeb3React();
  const { askAmount, bidAmount, bidDenom, strong, weak } = useExchange();
  const bondContract = BondingCont(library);
  const NOMcontract = NOMCont(library);
  const [unitprice, setUnitPrice] = useState(0);
  const [slippage, setSlippage] = useState(0);
  const [gasPriceChoice, setGasPriceChoice] = useState(2);
  const [gasPrice, setGasPrice] = useState(0);
  const [gasAppUsd, setGasAppUsd] = useState(0);
  const [gasAppEth, setGasAppEth] = useState(0);
  const [gasSellUsd, setGasSellUsd] = useState(0);
  const [gasSellEth, setGasSellEth] = useState(0);
  const [gasTotUsd, setGasTotUsd] = useState(0);
  const [gasTotEth, setGasTotEth] = useState(0);
  const { handleModal } = useModal();
  const { strDispatch } = useUpdateExchange();

  const getGasPrices = useCallback(async () => {
    if (type === 'approving') {
      const prices = await fetch('https://www.gasnow.org/api/v3/gas/price?utm_source=onomy');
      const result = await prices.json();
      gasOptions[0].text = (result.data.standard / 1e9).toPrecision(4) + ' (Standard)';
      gasOptions[1].text = (result.data.fast / 1e9).toPrecision(4) + ' (Fast)';
      gasOptions[2].text = (result.data.rapid / 1e9).toPrecision(4) + ' (Instant)';
      gasOptions[0].gas = new BigNumber(result.data.standard.toString());
      gasOptions[1].gas = new BigNumber(result.data.fast.toString());
      gasOptions[2].gas = new BigNumber(result.data.rapid.toString());
      setGasPrice(gasOptions[gasPriceChoice].gas);

      const gasFeeApprove = await NOMcontract.estimateGas.increaseAllowance(bondContract.address, bidAmount.toFixed(0));
      const gasFeeSell = await bondContract.estimateGas.sellNOM(
        bidAmount.toFixed(0),
        askAmount.toFixed(0),
        slippage.toFixed(0),
        {
          gasPrice: gasOptions[gasPriceChoice].gas.toFixed(0),
        },
      );
      const ethprices = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const ethresult = await ethprices.json();

      let gasFee = new BigNumber(gasFeeApprove.toString());
      gasFee = gasFee.times(gasOptions[gasPriceChoice].gas);
      let gasTotFee = gasFee;
      gasFee = format18(gasFee);
      setGasAppUsd(new BigNumber(ethresult.ethereum.usd).times(gasFee).toFixed(6));
      setGasAppEth(gasFee.toFixed(6));
      let gasFee1 = new BigNumber(gasFeeSell.toString());
      gasFee1 = gasFee1.times(gasOptions[gasPriceChoice].gas);
      gasTotFee = gasTotFee.plus(gasFee1);
      gasFee1 = format18(gasFee1);
      setGasSellUsd(new BigNumber(ethresult.ethereum.usd).times(gasFee1).toFixed(6));
      setGasSellEth(gasFee1.toFixed(6));
      gasTotFee = format18(gasTotFee);
      setGasTotUsd(new BigNumber(ethresult.ethereum.usd).times(gasTotFee).toFixed(6));
      setGasTotEth(gasTotFee.toFixed(6));
    }
  }, [gasPriceChoice, askAmount, bidAmount, bondContract, slippage, type, NOMcontract]);

  useEffect(() => {
    async function getUpdated() {
      await getGasPrices();
    }
    getUpdated();
  }, [getGasPrices]);

  const getAskAmount = useCallback(
    async (askAmountState, bidAmountUpdate, textStrength) => {
      var askAmountUpdate = askAmountState;

      switch (textStrength) {
        case 'strong':
          console.log('Strong: ', bidAmountUpdate.toFixed(0));
          askAmountUpdate = await bondContract.buyQuoteETH(bidAmountUpdate.toFixed(0));
          console.log('Pull Strong Ask Amount', askAmountUpdate);
          break;

        case 'weak':
          askAmountUpdate = await bondContract.sellQuoteNOM(bidAmountUpdate.toFixed(0));
          console.log('Pull Weak Ask Amount', askAmountUpdate);
          break;

        default:
          console.error('Denom not set');
      }
      return new BigNumber(askAmountUpdate.toString());
    },
    [bondContract],
  );

  useEffect(() => {
    async function fetchData() {
      let bidAmountUpdate = parse18(new BigNumber(parseFloat('1').toString()));
      let askAmountUpdate = await getAskAmount(askAmount, bidAmountUpdate, bidDenom);
      setUnitPrice(format18(new BigNumber(askAmountUpdate.toString())).toFixed(8));
    }

    fetchData();
  }, [getAskAmount, askAmount, bidDenom]);

  const onConfirm = async () => {
    try {
      strDispatch({
        type: 'status',
        value: 'APPROVE',
      });

      let tx = await NOMcontract.increaseAllowance(bondContract.address, bidAmount.toFixed(0));

      tx.wait().then(() => {
        handleModal(<TransactionCompletedModal tx={tx} />);
      });

      strDispatch({
        type: 'status',
        value: '',
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      // console.error(e.code, e.message.message);
      // alert(e.message)
      handleModal(<TransactionFailedModal error={e.code + '\n' + e.message.slice(0, 80) + '...'} />);
    }
  };

  return (
    <Modal.Wrapper>
      <main>
        {type === 'approving' ? (
          <Modal.PendingCaption>Confirm Approvement</Modal.PendingCaption>
        ) : (
          <Modal.PendingCaption>Transaction pending...</Modal.PendingCaption>
        )}

        <Modal.ExchangeResult>
          <Modal.ExchangeResultDescription>You're {type}</Modal.ExchangeResultDescription>
          {format18(bidAmount).toFixed(6)} <sup>{bidDenom === 'strong' ? strong : weak}</sup>
        </Modal.ExchangeResult>

        <TransactionDetailsRow>
          <span>Current Exchange Rate</span>
          <strong>
            1 {bidDenom === 'strong' ? strong : weak} = {unitprice} {bidDenom === 'strong' ? weak : strong}
          </strong>
        </TransactionDetailsRow>
        <TransactionDetailsRow>
          <span>You're Sending</span>
          <strong>
            {format18(askAmount).toFixed(6)} <sup>{bidDenom === 'strong' ? weak : strong}</sup>
          </strong>
        </TransactionDetailsRow>
        <TransactionDetailsRow>
          <div>
            <span>Wallet</span>

            <div>
              <strong>
                {account === null
                  ? '-'
                  : account
                  ? `${account.substring(0, 10)}...${account.substring(account.length - 4)}`
                  : ''}
              </strong>
            </div>
          </div>

          <WalletIcon>
            <Metamask />
          </WalletIcon>
        </TransactionDetailsRow>
        {type === 'approving' && (
          <div>
            <FeeWrapper>
              <span>Aprove Fee</span>
              <span>
                <strong>${gasAppUsd}</strong> ({gasAppEth} ETH)
              </span>
            </FeeWrapper>
            <FeeWrapper>
              <span>Estimated Sell Fee</span>
              <span>
                <strong>${gasSellUsd}</strong> ({gasSellEth} ETH)
              </span>
            </FeeWrapper>
            <FeeWrapper>
              <span>Total Estimated Fee</span>
              <span>
                <strong>${gasTotUsd}</strong> ({gasTotEth} ETH)
              </span>
            </FeeWrapper>
          </div>
        )}
      </main>
      {type === 'approving' && (
        <OptionsWrapper>
          <OptionCaption>Gas Fee</OptionCaption>
          <Options>
            {gasOptions.map(gasPriceOption => (
              <OptionBtn
                active={gasPrice === gasPriceOption.gas}
                key={gasPriceOption.gas}
                onClick={() => {
                  setGasPrice(gasPriceOption.gas);
                  setGasPriceChoice(gasPriceOption.id);
                }}
              >
                {gasPriceOption.text}
              </OptionBtn>
            ))}
          </Options>
          <OptionCaption>Slippage Limit</OptionCaption>
          <Options>
            {limitOptions.map(slippageOption => (
              <OptionBtn
                active={slippage === slippageOption.id}
                key={slippageOption.id}
                onClick={() => setSlippage(slippageOption.id)}
              >
                {slippageOption.text}
              </OptionBtn>
            ))}
          </Options>
          <SlippageDesc>
            Slippage is likely in times of high demand. Quote is based on most recent block and does not reflect
            transactions ahead of you in the mempool
          </SlippageDesc>
        </OptionsWrapper>
      )}
      <footer>
        {type !== 'approving' ? (
          <Modal.LoadingWrapper>
            <LoadingSpinner />
          </Modal.LoadingWrapper>
        ) : (
          <Modal.FooterControls>
            <Modal.SecondaryButton onClick={() => handleModal()}>Cancel</Modal.SecondaryButton>
            <Modal.PrimaryButton onClick={() => onConfirm()}>Confirm</Modal.PrimaryButton>
          </Modal.FooterControls>
        )}
      </footer>
    </Modal.Wrapper>
  );
}
