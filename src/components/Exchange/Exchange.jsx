import React, { useCallback, useState, useEffect } from "react";
import { useAsyncFn } from "lib/use-async-fn";
import { BigNumber } from 'bignumber.js'
import { format18, parse18 } from 'utils/math'

import {
  ExchangeWrapper,
  ExchangeItem,
  Sending,
  Receiving,
  ExchangeInput,
  MaxBtn,
  ReceivingValue,
  SellBtn,
  ExchangeButton,
} from "./exchangeStyles";

import ConfirmTransactionModal from '../Modals/ConfirmTransactionModal';
import { Dimmer } from "components/UI/Dimmer";

import ExchangeModals from "./ExchangeModals";
import { useModal, useUpdateModal } from 'context/ModalContext'
import { useSwap, useUpdateSwap } from "context/SwapContext";
import { useChain, useUpdateChain } from "context/chain/ChainContext";

import TransactionCompletedModal from "components/Modals/TransactionCompletedModal";
import OnomyConfirmationModal from "components/Modals/OnomyConfirmationModal";
import TransactionFailedModal from "components/Modals/TransactionFailedModal";
import PendingModal from "components/Modals/PendingModal";

export default function Exchange() {
  const {
    approveModal,
    completedModal,
    confirmModal,
    failedModal,
    pendingModal
  } = useModal();

  const {
    setApproveModal,
    setCompletedModal,
    setConfirmModal,
    setFailedModal,
    setPendingModal
  } = useUpdateModal()

  const { 
    swapBuyAmount, 
    swapBuyResult,
    swapBuyValue,
    swapSellAmount, 
    swapSellResult,
    swapSellValue, 
    swapDenom 
  } = useSwap();
  
  const { 
    setSwapBuyAmount, 
    setSwapBuyResult, 
    setSwapBuyValue, 
    setSwapSellAmount, 
    setSwapSellResult,
    setSwapSellValue, 
    setSwapDenom 
  } = useUpdateSwap();

  const { 
    bondContract, 
    NOMallowance, 
    NOMcontract, 
    ETHbalance, 
    NOMbalance, 
    pendingTx 
  } = useChain();
  
  const { setPendingTx } = useUpdateChain();
  
  const [completedAmount, setCompletedAmount] = useState(null);
  const [completedResult, setCompletedResult] = useState(null);
  const [slippage, setSlippage] = useState(1);
  const [previousTx, setPreviousTx] = useState(null);
 
  const onBuyNOMTextChange = useCallback(
    (evt) => {
      evt.preventDefault()
      setSwapBuyValue(evt.target.value)
      setSwapSellAmount('')
      setSwapSellResult('')
      setSwapSellValue('')
      setSwapDenom('ETH')
      if (BigNumber.isBigNumber(evt.target.value)) {
        setSwapBuyAmount('')
        setSwapBuyResult('')
      } else {
        try {
          setSwapBuyAmount(
            parse18(
              new BigNumber(
                evt.target.value
                )
                )
                )
                  
        } catch {
          setSwapBuyAmount(new BigNumber(0))
        }
        
      }
    },
    [
      setSwapBuyAmount,
      setSwapBuyResult,
      setSwapBuyValue,
      setSwapDenom, 
      setSwapSellAmount,
      setSwapSellResult
    ]
  );
  
  const onSellNOMTextChange = useCallback(
    (evt) => {
      evt.preventDefault()
      setSwapSellValue(evt.target.value)
      setSwapBuyAmount('')
      setSwapBuyResult('')
      setSwapDenom('NOM')

      if (!evt.target.value) {
        setSwapSellAmount('')
        setSwapSellResult('')
      } else {
        try {
          setSwapSellAmount(parse18(new BigNumber(evt.target.value)))
        } catch {
          setSwapSellAmount(new BigNumber(0))
        }
        
      }
    },
    [
      setSwapBuyAmount, 
      setSwapBuyResult,
      setSwapDenom,
      setSwapSellAmount,
      setSwapSellResult,
      setSwapSellValue
    ]
  );

  const submitTrans = useCallback(
    async (denom) => {
      if (!swapBuyAmount && !swapSellAmount) return;
      try {
        let tx;
        if (denom === "ETH") {
          tx = await bondContract.buyNOM(
            swapBuyResult,
            slippage * 100,
            { value: swapBuyAmount }
          );
        } else {
          tx = await bondContract.sellNOM(
            swapSellAmount,
            swapSellResult,
            slippage * 100,
          );
        }
        setPendingTx(tx);
        setConfirmModal('');
        setCompletedAmount(denom === 'ETH' ? swapBuyAmount : swapSellAmount);
        setCompletedResult(denom === 'ETH' ? swapBuyResult : swapSellResult);
        setPendingModal(true);
        setSwapBuyAmount("");
        setSwapSellAmount("");
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e.code, e.message.message);
        // alert(e.message)
        setFailedModal(e.code + '\n' + e.message.slice(0,80) + '...')
        // setSwapBuyAmount(swapBuyAmount);
      }
    },
    [
      bondContract,
      setCompletedAmount,
      setCompletedResult,
      setConfirmModal,
      setFailedModal,
      setPendingModal,
      setPendingTx,
      setSwapSellAmount,
      setSwapBuyAmount,
      slippage,
      swapBuyAmount,
      swapBuyResult,
      swapSellAmount,
      swapSellResult
    ]
  );

  useEffect(() => {
    if (pendingTx) {
      pendingTx.wait().then(() => {
        setPreviousTx(pendingTx);
        setCompletedModal(swapDenom);
        setPendingTx(null);
        setPendingModal(false);
      })
    }
  }, [
    pendingTx,
    setCompletedModal,
    setPendingModal,
    setPendingTx,
    swapBuyAmount,
    swapBuyResult,
    swapDenom,
    swapSellAmount,
    swapSellResult,
  ])

  const onBuy = () => {
    setSwapDenom('ETH');
    setConfirmModal('ETH');
  }

  const onSell = () => {
    setSwapDenom('NOM');
    setConfirmModal('NOM');
  }
  
  const onApprove = async (value) => {
    if(value <= NOMbalance) {
      try {
        setApproveModal(false);
        setPendingModal(true);
        setSwapDenom('APPROVE')
        let tx = await NOMcontract.increaseAllowance(
          bondContract.address,
          value
        );
        setPendingTx(tx);
      } catch (e) {
        // eslint-disable-next-line no-console
        // console.error(e.code, e.message.message);
        // alert(e.message)
        setFailedModal(e.code + '\n' + e.message.slice(0,80) + '...')
        // setSwapBuyAmount(swapBuyAmount);
      }    
    } else {
      setFailedModal('NOM Balance too low')
    }
  } 
  
  

  const [onSubmit, error] = useAsyncFn(submitTrans);

  const onEthMax = () => {
    setSwapBuyAmount(ETHbalance)
  }

  const onNOMMax = () => {
    setSwapSellAmount(NOMbalance)
  }
  return (
    <ExchangeWrapper>
      <ExchangeModals />
      {confirmModal && 
        <Dimmer>
          <ConfirmTransactionModal
            closeModal={() => setConfirmModal('')}
            type={confirmModal}
            amount={confirmModal === 'ETH' ? swapBuyAmount : swapSellAmount}
            result={confirmModal === 'ETH' ? swapBuyResult : swapSellResult}
            onConfirm={() => 
              onSubmit(confirmModal)
            }
            setSlippage={setSlippage}
            slippage={slippage}
          />
        </Dimmer>
      }
        {/* <TransactionCompletedModal /> */}
      {
        approveModal && 
          <Dimmer>
            <OnomyConfirmationModal
              closeModal={() => setApproveModal(false)}
              onConfirm={() => onApprove(swapSellAmount)}
            />
          </Dimmer>
      }
      {
        completedModal && (
          <Dimmer>
            <TransactionCompletedModal
              closeModal={() => setCompletedModal(false)}
              type={completedModal}
              amount={completedAmount}
              result={completedResult}
              previousTx={previousTx}
            />
          </Dimmer>
        )
      }
      {
        failedModal && (<Dimmer>
          <TransactionFailedModal
            closeModal={() => setFailedModal(null)}
            error={failedModal}
          />
        </Dimmer>)
      }
      {
        pendingModal && (
          <Dimmer>
            <PendingModal />
          </Dimmer>
        )
      }
      <ExchangeItem>
        <strong>Buy NOM</strong>
        <Sending>
          <strong>I'm sending</strong>
          <ExchangeInput
            type="text"
            onChange={onBuyNOMTextChange}
            value={swapBuyValue}
          />
          ETH
          <MaxBtn onClick={onEthMax}>Max</MaxBtn>
        </Sending>
        <Receiving>
          <strong>I'm receiving</strong>
          <ReceivingValue>
            {
              BigNumber.isBigNumber(swapBuyResult) ? 
              format18(swapBuyResult).toFixed(4) : 
              ''
            } NOM
          </ReceivingValue>
        </Receiving>
        <div>
          <ExchangeButton onClick={onBuy}>Buy NOM</ExchangeButton>
        </div>
      </ExchangeItem>

      <ExchangeItem>
        <strong>Sell NOM</strong>
        <Sending>
          <strong>I'm sending</strong>
          <ExchangeInput
            type="text"
            onChange={onSellNOMTextChange}
            value={swapSellValue}
          />
          NOM
          <MaxBtn onClick={onNOMMax}>Max</MaxBtn>
        </Sending>
        <Receiving>
          <strong>I'm receiving</strong>
          <ReceivingValue>
            {
              BigNumber.isBigNumber(swapSellResult) ? 
              format18(swapSellResult).toFixed(4) : 
              ''
            } ETH
          </ReceivingValue>
        </Receiving>
        <div>
          {
            NOMallowance > swapSellAmount && NOMbalance > swapSellAmount ? (
              <SellBtn onClick={onSell}>Sell NOM</SellBtn>) : 
                  NOMbalance > swapSellAmount ? (
                    <SellBtn onClick={() => setApproveModal(true)}>Approve</SellBtn>
                  ) : <SellBtn>Not enough NOM</SellBtn>
          }
        </div>
      </ExchangeItem>

      {error && <div>{error}</div>}
    </ExchangeWrapper>
  );
}