import React, { useState } from 'react';
import styled from 'styled-components';
import { BigNumber } from 'bignumber.js';

import { useExchange, useUpdateExchange } from 'context/exchange/ExchangeContext';
import { Caret, Close, Success } from '../Icons';
import * as Modal from '../styles';
import { useModal } from 'context/modal/ModalContext';
import { format18 } from 'utils/math';

export const ExplorerButton = styled(Modal.SecondaryButton)`
  width: 100%;
  margin-top: 32px;
`;

const networks = { 1: '', 4: 'rinkeby.' };

export default function TransactionCompletedModal({ tx }) {
  const [detailsActive, setDetailsActive] = useState(false);

  const { objDispatch, strDispatch } = useUpdateExchange();

  const { bidDenom, askAmount, bidAmount, status, strong, weak } = useExchange();

  const { handleModal } = useModal();

  const shortten = addr => {
    return addr.slice(0, 15) + '...' + addr.slice(addr.length - 3);
  };

  const onExplore = () => {
    window.open('https://' + networks[tx.chainId] + 'etherscan.io/tx/' + tx.hash, '_blank');
  };

  const closeModal = () => {
    let objUpdate = new Map();

    objUpdate = objUpdate.set('askAmount', new BigNumber(0));

    objUpdate = objUpdate.set('bidAmount', new BigNumber(0));

    objDispatch({
      type: 'update',
      value: objUpdate,
    });

    let strUpdate = new Map();

    strUpdate = strUpdate.set('input', '');

    strUpdate = strUpdate.set('output', '');

    strDispatch({
      type: 'update',
      value: strUpdate,
    });

    handleModal();
  };

  return (
    <Modal.Wrapper>
      <Modal.CloseIcon onClick={() => closeModal()}>
        <Close />
      </Modal.CloseIcon>

      <main>
        <Modal.ModalIconWrapper>
          <Success />
        </Modal.ModalIconWrapper>
        <Modal.Caption>Transaction Completed!</Modal.Caption>
        {status !== 'APPROVE' ? (
          <>
            <Modal.ExchangeResult>
              + {format18(askAmount).toFixed(8)} <sup>{bidDenom === 'strong' ? weak : strong}</sup>
              <Modal.Spent>
                - {format18(bidAmount).toFixed(8)} <sup>{bidDenom === 'strong' ? strong : weak}</sup>
              </Modal.Spent>
            </Modal.ExchangeResult>

            <Modal.ExchangeRateWrapper>
              <span>Exchange Rate</span>

              <strong>
                1 {bidDenom === 'strong' ? weak : strong} = {askAmount.div(bidAmount).toFixed(8)}{' '}
                {bidDenom === 'strong' ? strong : weak}
              </strong>
            </Modal.ExchangeRateWrapper>
          </>
        ) : (
          <Modal.ExchangeApproveText>Onomy blockchain confirmed access for selling.</Modal.ExchangeApproveText>
        )}
      </main>
      <footer>
        <Modal.FooterControls>
          <Modal.DetailsButton active={detailsActive} onClick={() => setDetailsActive(!detailsActive)}>
            View Details <Caret />
          </Modal.DetailsButton>
          <Modal.PrimaryButton onClick={() => closeModal()}>Done</Modal.PrimaryButton>
        </Modal.FooterControls>

        {detailsActive && (
          <Modal.FooterDetails>
            <Modal.FooterDetailsRow>
              <span>From</span> <strong>{shortten(tx.from)}</strong>
            </Modal.FooterDetailsRow>
            <Modal.FooterDetailsRow>
              <span>To</span> <strong>{shortten(tx.to)}</strong>
            </Modal.FooterDetailsRow>
            <Modal.FooterDetailsRow>
              <span>TxID</span> <strong>{shortten(tx.hash)}</strong>
            </Modal.FooterDetailsRow>
            <Modal.FooterDetailsRow>
              <span>Network Confirmations</span> <strong>{tx.confirmations > 0 ? tx.confirmations : 1}</strong>
            </Modal.FooterDetailsRow>

            <ExplorerButton onClick={() => onExplore()}>View in Explorer</ExplorerButton>
          </Modal.FooterDetails>
        )}
      </footer>
    </Modal.Wrapper>
  );
}
