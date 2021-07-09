import React, { useCallback, useEffect } from 'react';
import { BigNumber } from 'bignumber.js';
import ConfirmTransactionModal from 'components/Modals/components/ConfirmTransactionModal';
import PendingModal from 'components/Modals/components/PendingModal';
import ApproveTokensModal from 'components/Modals/components/ApproveTokensModal';
import RequestFailedModal from 'components/Modals/components/RequestFailedModal';
import TransactionCompletedModal from 'components/Modals/components/TransactionCompletedModal';
import TransactionFailedModal from 'components/Modals/components/TransactionFailedModal';
import { useWeb3React } from '@web3-react/core';

import { useChain } from 'context/chain/ChainContext';
import { BondingCont, NOMCont } from 'context/chain/contracts';
import { useExchange, useUpdateExchange } from 'context/exchange/ExchangeContext';
import {
  ExchangeItem,
  Sending,
  Receiving,
  ExchangeInput,
  MaxBtn,
  ReceivingValue,
  ExchangeButton,
} from './exchangeStyles';
import { useModal } from 'context/modal/ModalContext';
import NOMButton from 'components/Exchange/NOMButton';
import { format18, parse18 } from 'utils/math';

export default function ExchangeQuote({ strength }) {
  const { strongBalance, weakBalance } = useChain();
  const { handleModal } = useModal();
  const { library } = useWeb3React();

  const bondContract = BondingCont(library);
  const NOMcontract = NOMCont(library);

  const { askAmount, bidAmount, approveAmount, bidDenom, input, output, approve, strong, weak } = useExchange();
  const { NOMallowance } = useChain();

  useEffect(() => {
    console.log('Input: ', input);
    console.log('Output: ', output);
    console.log('Approve: ', approve);
  });

  const { objDispatch, strDispatch } = useUpdateExchange();

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

  const onApprove = async () => {
    if (weakBalance.gte(bidAmount)) {
      if (bidAmount.gt(NOMallowance)) {
        const approvalAmount = bidAmount.minus(NOMallowance);
        let objUpdate = new Map();
        objUpdate = objUpdate.set('approveAmount', approvalAmount);

        objDispatch({
          type: 'update',
          value: objUpdate,
        });

        let strUpdate = new Map();
        strUpdate = strUpdate.set('approve', format18(approvalAmount).toString());

        strDispatch({
          type: 'update',
          value: strUpdate,
        });

        handleModal(<ApproveTokensModal onConfirmApprove={onConfirmApprove} />);
      } else {
        handleModal(<ConfirmTransactionModal submitTrans={submitTrans} />);
      }
    } else {
      handleModal(<TransactionFailedModal error={`${weak} Balance too low`} />);
    }
  };

  const onConfirmApprove = () => {
    try {
      console.log('Approve Amount Before confirming: ', approve);
      handleModal(<ConfirmTransactionModal isApproving submitTrans={submitTrans} />);
    } catch (e) {
      handleModal(<TransactionFailedModal error={e.code + '\n' + e.message.slice(0, 80) + '...'} />);
    }
  };

  const submitTrans = async (isApproving, slippage, gasPrice) => {
    handleModal(<PendingModal isApproving={isApproving} />);

    if (isApproving) {
      if (!approveAmount) return;
      try {
        console.log('Approve Amount: ', approveAmount.toString());
        console.log('Approve Amount BG: ', approveAmount);
        console.log('Approve Amount; string', approve);
        console.log('Approve Amount: Bid', bidAmount.toString());

        let tx = await NOMcontract.increaseAllowance(bondContract.address, approveAmount.toFixed(8), {
          gasPrice: gasPrice.toFixed(0),
        });

        tx.wait().then(() => {
          handleModal(<TransactionCompletedModal tx={tx} />);
        });
      } catch (e) {
        console.log(e);
        handleModal(<TransactionFailedModal error={e.code + '\n' + e.message.slice(0, 80) + '...'} />);
      }
    } else {
      if (!bidAmount || !askAmount) return;
      try {
        let tx;
        let gasFee;

        switch (bidDenom) {
          case 'strong':
            // Preparing for many tokens / coins
            switch (strong) {
              case 'ETH':
                const gasFeeRaw = await bondContract.estimateGas.buyNOM(askAmount.toFixed(0), slippage.toFixed(0), {
                  value: bidAmount.toFixed(0),
                });

                gasFee = new BigNumber(gasFeeRaw.toString());

                const bidAmountUpdate = bidAmount.minus(gasFee.times(gasPrice));
                const askAmountUpdateRaw = await bondContract.buyQuoteETH(bidAmountUpdate.toFixed(0));
                const askAmountUpdate = new BigNumber(askAmountUpdateRaw.toString());

                tx = await bondContract.buyNOM(askAmountUpdate.toFixed(0), slippage.toFixed(0), {
                  value: bidAmountUpdate.toFixed(0),
                  gasPrice: gasPrice.toFixed(0),
                  gasLimit: gasFee.toFixed(0),
                });

                tx.wait().then(() => {
                  handleModal(<TransactionCompletedModal tx={tx} />);
                });

                break;
              default: {
              }
            }
            break;

          case 'weak':
            switch (weak) {
              case 'wNOM':
                tx = await bondContract.sellNOM(bidAmount.toFixed(0), askAmount.toFixed(0), slippage.toFixed(0), {
                  gasPrice: gasPrice.toFixed(0),
                });

                tx.wait().then(() => {
                  handleModal(<TransactionCompletedModal tx={tx} />);
                });
                break;
              default: {
              }
            }
            break;

          default:
            console.log();
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e.code, e.message.message);
        // alert(e.message)
        handleModal(<TransactionFailedModal error={e.code + '\n' + e.message.slice(0, 80) + '...'} />);
      }
    }
  };

  const onBid = () => {
    switch (true) {
      case bidDenom !== strength:
        handleModal(<RequestFailedModal error="Please enter amount" />);
        break;
      case strength === 'strong' && strongBalance.gte(bidAmount):
        handleModal(<ConfirmTransactionModal submitTrans={submitTrans} />);
        break;
      case strength === 'weak' && weakBalance.gte(bidAmount):
        handleModal(<ConfirmTransactionModal submitTrans={submitTrans} />);
        break;
      default:
        handleModal(<RequestFailedModal error="Insufficient funds" />);
    }
  };

  const onMax = async () => {
    let strUpdate = new Map();
    strUpdate.set('bidDenom', strength);
    let bidMaxValue = strength === 'strong' ? strongBalance : weakBalance;

    strUpdate.set('input', format18(bidMaxValue).toString());

    let askAmountUpdate;

    try {
      askAmountUpdate = await getAskAmount(askAmount, bidMaxValue, strength);
    } catch (err) {
      if (err) {
        handleModal(<RequestFailedModal error={err.error.message} />);
      }
    }

    let objUpdate = new Map();

    objUpdate = objUpdate.set('askAmount', askAmountUpdate);

    objUpdate = objUpdate.set('bidAmount', bidMaxValue);

    objDispatch({
      type: 'update',
      value: objUpdate,
    });

    strUpdate.set('output', format18(new BigNumber(askAmountUpdate.toString())).toFixed(8));

    strDispatch({
      type: 'update',
      value: strUpdate,
    });
  };

  const onTextChange = useCallback(
    async (evt, textStrength) => {
      evt.preventDefault();
      const floatRegExp = new RegExp(/(^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$)|(^\d\.$)/);
      console.log('Component Strength: ', strength);
      console.log('Text Strength: ', textStrength);
      console.log('Bid Denom: ', bidDenom);
      let strUpdate = new Map();
      switch (true) {
        case bidDenom === strength && input === evt.target.value.toString():
          break;
        case evt.target.value === '' || evt.target.value === '.':
          {
            let objUpdate = new Map();

            objUpdate = objUpdate.set('askAmount', new BigNumber(0));

            objUpdate = objUpdate.set('bidAmount', new BigNumber(0));

            objDispatch({
              type: 'update',
              value: objUpdate,
            });
          }

          strUpdate = strUpdate.set('bidDenom', strength);

          strUpdate = strUpdate.set('input', evt.target.value.toString());

          strUpdate = strUpdate.set('output', '');

          strDispatch({
            type: 'update',
            value: strUpdate,
          });

          break;
        case floatRegExp.test(evt.target.value.toString()):
          console.log('Input after test', evt.target.value);
          const bidAmountUpdate = parse18(new BigNumber(parseFloat(evt.target.value).toString()));

          const inputUpdate = evt.target.value.toString();

          if (bidDenom !== strength) {
            strUpdate = strUpdate.set('bidDenom', strength);
          }

          var askAmountUpdate;

          try {
            askAmountUpdate = await getAskAmount(askAmount, bidAmountUpdate, textStrength);
          } catch (err) {
            if (err) {
              console.log(err.error.message);
              handleModal(<RequestFailedModal error={err.error.message} />);
            }
            break;
          }

          let objUpdate = new Map();

          objUpdate = objUpdate.set('askAmount', new BigNumber(askAmountUpdate.toString()));

          objUpdate = objUpdate.set('bidAmount', bidAmountUpdate);

          objDispatch({
            type: 'update',
            value: objUpdate,
          });

          strUpdate = strUpdate.set('input', inputUpdate);

          strUpdate = strUpdate.set('output', format18(new BigNumber(askAmountUpdate.toString())).toFixed(8));

          strDispatch({
            type: 'update',
            value: strUpdate,
          });

          break;
        default:
          handleModal(<RequestFailedModal error="Please enter numbers only. Thank you!" />);
      }
    },
    [askAmount, bidDenom, getAskAmount, handleModal, input, objDispatch, strDispatch, strength],
  );

  return (
    <ExchangeItem>
      <strong>Bid {strength === 'strong' ? strong : weak}</strong>
      <Sending>
        <strong>I'm bidding</strong>
        <ExchangeInput
          type="text"
          onChange={evt => onTextChange(evt, strength)}
          value={bidDenom === strength ? input : ''}
          placeholder="0.00"
        />
        {strength === 'strong' ? strong : weak}
        <MaxBtn onClick={() => onMax()}>Max</MaxBtn>
      </Sending>
      <Receiving>
        <strong>I'm asking</strong>
        <ReceivingValue>
          {strength === bidDenom ? output : ''} {strength === 'strong' ? weak : strong}
        </ReceivingValue>
      </Receiving>
      {strength === 'strong' ? (
        bidDenom === 'weak' ? (
          <ExchangeButton>Input Value</ExchangeButton>
        ) : bidAmount.lte(strongBalance) ? (
          input === '' ? (
            <ExchangeButton>Input Value</ExchangeButton>
          ) : (
            <ExchangeButton onClick={onBid}>Buy {strength === 'strong' ? weak : strong}</ExchangeButton>
          )
        ) : (
          <ExchangeButton>Low {strong} Balance</ExchangeButton>
        )
      ) : (
        <NOMButton onBid={onBid} onApprove={onApprove} />
      )}
    </ExchangeItem>
  );
}
