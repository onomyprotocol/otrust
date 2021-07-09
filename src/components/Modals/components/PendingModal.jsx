import styled from 'styled-components';
import { BigNumber } from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import LoadingSpinner from 'components/UI/LoadingSpinner';
import { Metamask } from 'components/Modals/Icons';

import { useExchange } from 'context/exchange/ExchangeContext';
import { format18 } from 'utils/math';
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

export default function PendingModal({ isApproving }) {
  const { account } = useWeb3React();
  const { input, approve, bidDenom, strong, weak, bidAmount, askAmount } = useExchange();

  return (
    <Modal.Wrapper>
      <main>
        <Modal.PendingCaption>Transaction pending...</Modal.PendingCaption>

        <Modal.ExchangeResult>
          <Modal.ExchangeResultDescription>
            You're {isApproving ? 'approving' : bidDenom === 'strong' ? 'buying' : 'selling'}
          </Modal.ExchangeResultDescription>
          {isApproving ? approve : input} <sup>wNOM</sup>
        </Modal.ExchangeResult>

        <TransactionDetailsRow>
          <span>Current Exchange Rate</span>
          <strong>
            {bidDenom && (
              <>
                1 {bidDenom === 'strong' ? strong : weak} ={' '}
                {BigNumber.isBigNumber(bidAmount) ? format18(askAmount.div(bidAmount)).toFixed(6) : 'Loading'}
              </>
            )}{' '}
            {bidDenom === 'strong' ? weak : strong}
          </strong>
        </TransactionDetailsRow>
        <TransactionDetailsRow>
          <span>{isApproving ? "You're approving" : "You're receiving"}</span>
          <strong>
            {isApproving ? approve : format18(bidAmount).toFixed(6)} {bidDenom === 'strong' ? strong : weak}
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

        {/* <FeeWrapper>
          <span>Transaction fee</span>
          <span>
            <strong>$5.4</strong> (0.00032 ETH)
          </span>
        </FeeWrapper> */}
      </main>
      <footer>
        <Modal.LoadingWrapper>
          <LoadingSpinner />
        </Modal.LoadingWrapper>
      </footer>
    </Modal.Wrapper>
  );
}
