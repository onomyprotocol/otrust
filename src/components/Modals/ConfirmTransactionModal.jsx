import React, { useState } from "react";
import styled from "styled-components";
import { lighten } from "polished";
import { useWeb3React } from "@web3-react/core";
import useInterval from '@use-it/interval';
import LoadingBar from 'components/Modals/LoadingBar'
import { BigNumber } from 'bignumber.js'
import { format18 } from 'utils/math'

import { useChain } from 'context/chain/ChainContext'
import { Close, Metamask } from "./Icons";
import * as Modal from "./styles";
import './loadingBar.css';

const TransactionDetailsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 16px;
  }

  span {
    font-weight: 400;
    color: ${(props) => props.theme.colors.textThirdly};
  }

  strong {
    font-weight: 500;
  }
`;

const SlippageWrapper = styled.section`
  padding: 32px 32px;

  border-top: 1px solid ${(props) => props.theme.colors.bgHighlightBorder};
`;

const SlippageCaption = styled.p`
  margin: 0 0 12px;
  color: ${(props) => props.theme.colors.textThirdly};
`;

const SlippageDesc = styled.p`
  margin: 16px 0 0;
  color: ${(props) => props.theme.colors.textSecondary};
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

  background-color: ${(props) => props.theme.colors.bgDarken};

  svg {
    width: 24px;
    height: 24px;
  }
`;

const LimitBtn = styled.button`
  padding: 12px 16px;

  background-color: ${(props) =>
    props.active ? props.theme.colors.bgHighlightBorder : "transparent"};
  border: 1px solid ${(props) => props.theme.colors.bgHighlightBorder};
  border-radius: 22px;

  font-size: 14px;
  font-weight: 500;
  color: ${(props) =>
    props.active
      ? props.theme.colors.textPrimary
      : props.theme.colors.textSecondary};

  &:hover {
    background-color: ${(props) =>
      lighten(0.1, props.theme.colors.bgHighlightBorder)};
  }
`;

const limitOptions = [
  {
    id: 0,
    text: "No limit",
    value: 0,
  },
  {
    id: 1,
    text: "1%",
    value: 1,
  },
  {
    id: 2,
    text: "2.5%",
    value: 2.5,
  },
  {
    id: 3,
    text: "5%",
    value: 5,
  },
];

export default function ConfirmTransactionModal({ closeModal, type, amount, result, onConfirm, slippage, setSlippage }) {
  // const [limit, setLimit] = useState(0);
  console.log("Amount: ", amount)
  console.log("Result: ", result)
  console.log("Slippage: ", slippage)
  const { account } = useWeb3React();
  const { currentETHPrice, currentNOMPrice } = useChain()
  const [count, setCount] = useState(60);
  const [delay, setDelay] = useState(1000);

  const increaseCount = () => {
    if(count === 0) {
      setDelay(null);
      closeModal();
    } else {
      setCount(count - 1);
    }
  }

  useInterval(increaseCount, delay);
  
  return (
    <Modal.Wrapper>
      <LoadingBar progress={(60 - count) / 60 * 100} color='#dddae8' className="loadingBar" />
      <Modal.CloseIcon onClick={closeModal}>
        <Close />
      </Modal.CloseIcon>

      <main>
        <Modal.Caption>Confirm Transaction</Modal.Caption>

        <Modal.ExchangeResult>
          <Modal.ExchangeResultDescription>You're receiving</Modal.ExchangeResultDescription>
          ~ {BigNumber.isBigNumber(result) ? format18(result).toFixed(6) : ""} <sup>{type === 'ETH' ? 'NOM' : 'ETH'}</sup>
        </Modal.ExchangeResult>

        <TransactionDetailsRow>
          <span>Current Exchange Rate</span>

          <strong>
            1 {type} = {
                type === 'ETH' ? 
                  format18(currentETHPrice).toFixed(6) : 
                  format18(currentNOMPrice).toFixed(6)
              } 
            {type === 'ETH' ? 'NOM' : 'ETH'}
          </strong>
        </TransactionDetailsRow>
        <TransactionDetailsRow>
          <span>You're Sending</span>

          <strong>{amount} {type}</strong>
        </TransactionDetailsRow>
        <TransactionDetailsRow>
          <div>
            <span>Wallet</span>

            <div>
              <strong>
                {account === null
                  ? "-"
                  : account
                  ? `${account.substring(0, 10)}...${account.substring(
                      account.length - 4
                    )}`
                  : ""}
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
          {limitOptions.map((l) => (
            <LimitBtn
              active={l.value === slippage}
              key={l.id}
              onClick={() => setSlippage(l.value)}
            >
              {l.text}
            </LimitBtn>
          ))}
        </SlippageValues>
        <SlippageDesc>
          Slippage is likely in times of high demand. Quote is based on most
          recent block and does not reflect transactions ahead of you in the
          mempool
        </SlippageDesc>
      </SlippageWrapper>
      <footer>
        <Modal.FooterControls>
          <Modal.SecondaryButton onClick={() => closeModal()}>Cancel</Modal.SecondaryButton>
          <Modal.PrimaryButton onClick={() => onConfirm()}>Confirm ({count})</Modal.PrimaryButton>
        </Modal.FooterControls>
      </footer>
    </Modal.Wrapper>
  );
}
