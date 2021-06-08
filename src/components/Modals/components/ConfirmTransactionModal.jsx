import React, { useState } from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';
import useInterval from '@use-it/interval';
// import LoadingBar from 'components/Modals/LoadingBar'
import { BigNumber } from 'bignumber.js';
import { Close, Metamask } from 'components/Modals/Icons';
import { useWeb3React } from '@web3-react/core';

import { format18 } from 'utils/math';
import { useModal } from 'context/modal/ModalContext';
import * as Modal from 'components/Modals/styles';
import 'components/Modals/loadingBar.css';
import { useExchange } from 'context/exchange/ExchangeContext';

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

const SlippageWrapper = styled.section`
  padding: 32px 32px;

  border-top: 1px solid ${props => props.theme.colors.bgHighlightBorder};
`;

const SlippageCaption = styled.p`
  margin: 0 0 12px;
  color: ${props => props.theme.colors.textThirdly};
`;

const SlippageDesc = styled.p`
  margin: 16px 0 0;
  color: ${props => props.theme.colors.textSecondary};
`;

const SlippageValues = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  margin: 12px 0 16px;
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

const LimitBtn = styled.button`
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

export default function ConfirmTransactionModal({ submitTrans }) {
  const [slippage, setSlippage] = useState();
  const { handleModal } = useModal();
  const { account } = useWeb3React();

  const { askAmount, bidAmount, bidDenom, strong, weak } = useExchange();

  const [count, setCount] = useState(60);
  const [delay, setDelay] = useState(1000);

  const increaseCount = () => {
    if (count === 0) {
      setDelay(null);
      handleModal();
    } else {
      setCount(count - 1);
    }
  };

  useInterval(increaseCount, delay);

  return (
    <Modal.Wrapper>
      <Modal.CloseIcon onClick={() => handleModal()}>
        <Close />
      </Modal.CloseIcon>

      <main>
        <Modal.Caption>Confirm Transaction</Modal.Caption>

        <Modal.ExchangeResult>
          <Modal.ExchangeResultDescription>You're receiving</Modal.ExchangeResultDescription>~{' '}
          {BigNumber.isBigNumber(askAmount) ? format18(askAmount).toFixed(6) : ''}
          <sup>{bidDenom === 'strong' ? 'NOM' : 'ETH'}</sup>
        </Modal.ExchangeResult>

        <TransactionDetailsRow>
          <span>Current Exchange Rate</span>
          <strong>
            {bidDenom ? (
              <>
                1 {bidDenom === 'strong' ? strong : weak} ={' '}
                {BigNumber.isBigNumber(bidAmount) ? format18(askAmount.div(bidAmount)).toFixed(6) : 'Loading'}
              </>
            ) : (
              <></>
            )}{' '}
            {bidDenom === 'strong' ? weak : strong}
          </strong>
        </TransactionDetailsRow>
        <TransactionDetailsRow>
          <span>You're Sending</span>
          <strong>
            {format18(bidAmount).toFixed(6)} {bidDenom === 'strong' ? strong : weak}
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
      </main>
      <SlippageWrapper>
        <SlippageCaption>Slippage Limit</SlippageCaption>
        <SlippageValues>
          {limitOptions.map(l => (
            <LimitBtn active={slippage === l.id} key={l.id} onClick={() => setSlippage(l.id)}>
              {l.text}
            </LimitBtn>
          ))}
        </SlippageValues>
        <SlippageDesc>
          Slippage is likely in times of high demand. Quote is based on most recent block and does not reflect
          transactions ahead of you in the mempool
        </SlippageDesc>
      </SlippageWrapper>
      <footer>
        <Modal.FooterControls>
          <Modal.SecondaryButton onClick={() => handleModal()}>Cancel</Modal.SecondaryButton>
          <Modal.PrimaryButton onClick={() => submitTrans(slippage)}>Confirm ({count})</Modal.PrimaryButton>
        </Modal.FooterControls>
      </footer>
    </Modal.Wrapper>
  );
}
