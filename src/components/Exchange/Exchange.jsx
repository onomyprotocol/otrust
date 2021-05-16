import React, { useCallback, useState, useEffect } from "react";
import { useAsyncFn } from "lib/use-async-fn";
import { chopFloat, truncate } from "utils/math"
import { BigNumber } from "@ethersproject/bignumber"
import { parseEther, formatEther } from "@ethersproject/units";

import ExchangeModals from "./ExchangeModals";
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

import { useSwap, useUpdateSwap } from "context/SwapContext";
import { useChain, useUpdateChain } from "context/chain/ChainContext";
// import { useAllowance } from "context/useAllowance";
import TransactionCompletedModal from "components/Modals/TransactionCompletedModal";
import OnomyConfirmationModal from "components/Modals/OnomyConfirmationModal";
import TransactionFailedModal from "components/Modals/TransactionFailedModal";
import PendingModal from "components/Modals/PendingModal";

export default function Exchange() {
  const { swapBuyAmount, swapBuyResult, swapSellAmount, swapSellResult, swapDenom } = useSwap();
  const { setSwapBuyAmount, setSwapBuyResult, setSwapSellAmount, setSwapSellResult, setSwapDenom } = useUpdateSwap();
  // const allowance = useAllowance();
  const [confirmModal, setConfirmModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [completedModal, setCompletedModal] = useState('');
  const [completedAmount, setCompletedAmount] = useState(null);
  const [completedResult, setCompletedResult] = useState(null);
  const [slippage, setSlippage] = useState(1);
  const [previousTx, setPreviousTx] = useState(null);
  const [failedModal, setFailedModal] = useState(null);
  
  const [pendingModal, setPendingModal] = useState(false);
  const { bondContract, NOMallowance, NOMcontract, ETHbalance, NOMbalance, pendingTx } = useChain();
  const { setPendingTx } = useUpdateChain();
  
  const onBuyNOMTextChange = useCallback(
    (evt) => {
      setSwapSellAmount(BigNumber.from(0))
      setSwapSellResult(BigNumber.from(0))
      setSwapDenom('ETH')
      if (evt.target.value > 0) {
        setSwapBuyAmount(parseEther(evt.target.value))
      } else {
        setSwapBuyAmount(BigNumber.from(0))
      }
    },
    [setSwapBuyAmount, setSwapDenom, setSwapSellAmount, setSwapSellResult]
  );
  
  const onSellNOMTextChange = useCallback(
    (evt) => {
      setSwapBuyAmount(BigNumber.from(0))
      setSwapBuyResult(BigNumber.from(0))
      setSwapDenom('NOM')

      if (evt.target.value > 0) {
        setSwapSellAmount(parseEther(parseFloat(evt.target.value).toString()))
      } else {
        setSwapSellAmount(BigNumber.from(0))
      }
    },
    [setSwapSellAmount, setSwapDenom, setSwapBuyAmount, setSwapBuyResult]
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
      swapBuyAmount,
      swapBuyResult,
      swapSellAmount,
      swapSellResult,
      bondContract,
      setSwapBuyAmount,
      setPendingTx,
      slippage,
      setCompletedAmount,
      setCompletedResult,
      setSwapSellAmount
    ]
  );

  useEffect(() => {
    if (pendingTx) {
      // setWaitModal(true)
      pendingTx.wait().then(() => {
        setPreviousTx(pendingTx);
        setCompletedModal(swapDenom);
        setPendingTx(null);
        setPendingModal(false);
        // setWaitModal(false);
      })
    }
  }, [
    pendingTx,
    swapDenom,
    setPendingTx,
    swapBuyAmount,
    swapSellAmount,
    swapBuyResult,
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
            value={formatEther(swapBuyAmount).toString()}
          />
          ETH
          <MaxBtn onClick={onEthMax}>Max</MaxBtn>
        </Sending>
        <Receiving>
          <strong>I'm receiving</strong>
          <ReceivingValue>
            {truncate(formatEther(swapBuyResult), 4)} NOM
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
          />
          NOM
          <MaxBtn onClick={onNOMMax}>Max</MaxBtn>
        </Sending>
        <Receiving>
          <strong>I'm receiving</strong>
          <ReceivingValue>
            {truncate(formatEther(swapSellResult), 4)} ETH
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