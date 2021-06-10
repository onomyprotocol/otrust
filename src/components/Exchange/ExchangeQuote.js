import React, { useCallback, useEffect } from "react";

import { BigNumber } from 'bignumber.js'

import { useChain } from 'context/chain/ChainContext'

import { BondingCont, NOMCont } from 'context/chain/contracts'

import { 
    useExchange, 
    useUpdateExchange 
} from 'context/exchange/ExchangeContext'

import {
    ExchangeItem,
    Sending,
    Receiving,
    ExchangeInput,
    MaxBtn,
    ReceivingValue,
    ExchangeButton
} from "./exchangeStyles"

import { useModal } from 'context/modal/ModalContext'

import ConfirmTransactionModal from 'components/Modals/components/ConfirmTransactionModal'
import PendingModal from 'components/Modals/components/PendingModal'
import RequestFailedModal from 'components/Modals/components/RequestFailedModal'
import TransactionCompletedModal from 'components/Modals/components/TransactionCompletedModal'
import TransactionFailedModal from 'components/Modals/components/TransactionFailedModal'

import NOMButton from 'components/Exchange/NOMButton'
import { format18, parse18 } from 'utils/math'
import { useWeb3React } from "@web3-react/core";
import { utils } from "ethers";
// import { validate } from "graphql";


export default function ExchangeQuote({strength}) {
  
  const { gasOptions, strongBalance, weakBalance } = useChain()
  const { handleModal } = useModal()
  const { library } = useWeb3React()
  
  const bondContract = BondingCont(library)
  const NOMcontract = NOMCont(library)

  const { 
    askAmount,
    bidAmount,
    bidDenom,
    input,
    output,
    strong,
    weak
  } = useExchange();

  const { 
    objDispatch,
    strDispatch
  } = useUpdateExchange();

  

  const getAskAmount = useCallback(async (askAmountState, bidAmountUpdate, textStrength) => {
    var askAmountUpdate = askAmountState
        
    switch (textStrength) {
        case 'strong':
            askAmountUpdate = await bondContract.buyQuoteETH(
                bidAmountUpdate.toFixed(0)
            )
            break

        case 'weak':
            askAmountUpdate = await bondContract.sellQuoteNOM(
                bidAmountUpdate.toFixed(0)
            )
            break

        default:
            console.error("Denom not set");
    }
    return new BigNumber(askAmountUpdate.toString())
  },[bondContract])

  const onApprove = async () => {
    if(bidAmount <= weakBalance) {
      handleModal(
        <PendingModal />
      );
      
      try {
        
        strDispatch({
          type: 'status', 
          value: 'APPROVE'
        })

        let tx = await NOMcontract.increaseAllowance(
          bondContract.address,
          bidAmount.toFixed(0)
        );

        tx.wait().then(() => {
          handleModal(
            <TransactionCompletedModal
              tx = {tx}
            />
          )
        })

        strDispatch({
            type: 'status',
            value: ''
        })

      } catch (e) {
        // eslint-disable-next-line no-console
        // console.error(e.code, e.message.message);
        // alert(e.message)
        handleModal(
          <TransactionFailedModal
            error={e.code + '\n' + e.message.slice(0,80) + '...'}
          />
        )
      }    
    } else {
      handleModal(
            <TransactionFailedModal
              error={`${weak} Balance too low`}
            />
      )
    }
  }

  const submitTrans = useCallback(
    async (slippage, gasPrice) => {
      handleModal(
        <PendingModal />
      )
      if (!bidAmount || !askAmount) return;
      try {
        let tx;
        switch (bidDenom) {
          case 'strong':
            // Preparing for many tokens / coins
            switch (strong) {
              case 'ETH':
                tx = await bondContract.buyNOM(
                  askAmount.toFixed(0),
                  slippage.toFixed(0),
                  { 
                    value: bidAmount.toFixed(0),
                    gasPrice: ((gasPrice || '30').toString(), 'wei')
                  })

                  tx.wait().then(() => {
                    handleModal(
                      <TransactionCompletedModal
                        tx = {tx}
                      />
                    )
                  })
              break

              default:
                {}
            }
            break
          
          case 'weak':
            switch (weak) {
              case 'wNOM':
                tx = await bondContract.sellNOM(
                  bidAmount.toFixed(0),
                  askAmount.toFixed(0),
                  slippage.toFixed(0),
                  {
                    gasPrice: utils.parseUnits(gasPrice || '30'.toString(), 'gwei')
                  }
                )

                tx.wait().then(() => {
                  handleModal(
                    <TransactionCompletedModal
                      tx = {tx}
                    />
                  )
                })
                break
              default:
                {}
            }
            break
          
          default:
            console.log()
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e.code, e.message.message);
        // alert(e.message)
        handleModal(
          <TransactionFailedModal
            error={e.code + '\n' + e.message.slice(0,80) + '...'}
          />
        )
      }
    },[
      askAmount,
      bidAmount,
      bidDenom,
      bondContract,
      handleModal,
      strong,
      weak
    ]
  )

  const onBid = () => {
    switch (true) {
      case (bidDenom !== strength):
        handleModal(
          <RequestFailedModal
            error = "Please enter amount"
          />  
        )
        break
      case (strength === 'strong' && strongBalance.gte(bidAmount)):
        handleModal(
          <ConfirmTransactionModal 
            submitTrans = {submitTrans}
          />
        )
        break
      case (strength === 'weak' && weakBalance.gte(bidAmount)):
        handleModal(
          <ConfirmTransactionModal 
            submitTrans = {submitTrans}
          />
        )
        break
      default:
        handleModal(
          <RequestFailedModal
            error = 'Insufficient funds'
          />
        )
    }
  }

  const onMax = async () => {
    let strUpdate = new Map()
    strUpdate.set("bidDenom", strength)
    let bidMaxValue = strength === "strong"
      ? format18(strongBalance).toString()
      : format18(weakBalance).toString()

    strUpdate.set(
      "input",
      bidMaxValue
    );

    const bidAmountUpdate = parse18(
      new BigNumber(parseFloat(bidMaxValue).toString())
    );

    let askAmountUpdate
    
    console.log("Gas Option 2: ", gasOptions[2].gas)
    console.log("Bid Amount: ", (bidAmountUpdate.minus(gasOptions[2].gas)).toFixed(0))
    try {
        askAmountUpdate = await getAskAmount(
          askAmount,
          bidAmountUpdate.minus(gasOptions[2].gas),
          strength
        );
      } catch (err) {
        if (err) {
          handleModal(<RequestFailedModal error={err.error.message} />)
        }
      }
    
    let objUpdate = new Map()

    objUpdate = objUpdate.set(
      'askAmount',
      new BigNumber(askAmountUpdate.toString())
    )
    
    objUpdate = objUpdate.set(
      'bidAmount',
      bidAmountUpdate.minus(gasOptions[2].gas)
    )

    objDispatch({
      type: 'update',
      value: objUpdate
    })

    strUpdate.set(
      "output",
      format18(new BigNumber(askAmountUpdate.toString())).toFixed(8)
    );

    strDispatch({
      type: "update",
      value: strUpdate
    })

  }

  const onTextChange = useCallback(
    async (evt, textStrength) => {
      evt.preventDefault()
      const floatRegExp = new RegExp(/(^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$)|(^\d\.$)/)
      let strUpdate = new Map()
      switch (true) {
        case (bidDenom === strength && input === evt.target.value.toString()): break
        case (evt.target.value === '' || evt.target.value === '.'):
          {
            let objUpdate = new Map()

            objUpdate = objUpdate.set(
              'askAmount',
              new BigNumber(0)
            )
            
            objUpdate = objUpdate.set(
              'bidAmount',
              new BigNumber(0)
            )

            objDispatch({
              type: 'update',
              value: objUpdate
            })
          }
          
          strUpdate = strUpdate.set(
            'bidDenom',
            strength
          )

          strUpdate = strUpdate.set(
            'input',
            evt.target.value.toString()
          )
          
          strUpdate = strUpdate.set(
            'output',
            ''
          )

          strDispatch({
            type: 'update', 
            value: strUpdate
          })

          break
          case (floatRegExp.test(evt.target.value.toString())):
          console.log("Input after test", evt.target.value)
          const bidAmountUpdate = parse18(new BigNumber(
              parseFloat(evt.target.value).toString()
            )
          )

          const inputUpdate = evt.target.value.toString()
          
          if (bidDenom !== strength) {
            strUpdate = strUpdate.set(
              'bidDenom',
              strength          
            )
          }

          var askAmountUpdate

          try {
            askAmountUpdate = await getAskAmount(askAmount, bidAmountUpdate, textStrength)
          } catch(err) {
            if (err) {
              console.log(err.error.message)
              handleModal(
                <RequestFailedModal
                  error = {err.error.message}
                />
              )
            }
            break
          }

          let objUpdate = new Map()

          objUpdate = objUpdate.set(
            'askAmount',
            new BigNumber(askAmountUpdate.toString())
          )
          
          objUpdate = objUpdate.set(
            'bidAmount',
            bidAmountUpdate
          )

          objDispatch({
            type: 'update',
            value: objUpdate
          })

          strUpdate = strUpdate.set(
            'input',
            inputUpdate
          )
          
          strUpdate = strUpdate.set(
            'output',
            format18(new BigNumber(askAmountUpdate.toString())).toFixed(8)
          )

          strDispatch({
            type: 'update', 
            value: strUpdate
          })

          break
        default:
          handleModal(
            <RequestFailedModal
              error = "Please enter numbers only. Thank you!"
            />
          )
      }
  },
  [ 
    askAmount,
    bidDenom,
    getAskAmount,
    handleModal,
    input,
    objDispatch,
    strDispatch,
    strength
  ]
  );

  return(
      <ExchangeItem>
          <strong>Bid {(strength === 'strong') ? strong : weak}</strong>
          <Sending>
              <strong>I'm bidding</strong>
              <ExchangeInput
                  type="text"
                  onChange={(evt) => onTextChange(evt, strength)}
                  value={(bidDenom === strength) ? input : ''}
              />
              {(strength === 'strong') ? strong : weak}
              <MaxBtn onClick={() => onMax()}>Max</MaxBtn>
          </Sending>
            <Receiving>
                <strong>I'm asking</strong>
                <ReceivingValue>
                    {(strength === bidDenom) ? output : ''}
                    {' '}
                    {(strength === 'strong') ? weak : strong}
                </ReceivingValue>
            </Receiving>
            { 
              (strength === 'strong') ? 
              (
                bidDenom === 'weak' ?
                  <ExchangeButton>
                    Input Value
                  </ExchangeButton> :
                  (
                    (bidAmount.lte(strongBalance)) ?
                      (
                        (input === '') ?
                        <ExchangeButton>
                          Input Value
                        </ExchangeButton> :
                        <ExchangeButton 
                          onClick={onBid}>
                          Buy {(strength === 'strong') ? weak : strong}
                        </ExchangeButton>
                      ) :
                      <ExchangeButton>
                        Low {strong} Balance
                      </ExchangeButton>
                  )
              ) :
              (<NOMButton
                onBid={onBid}
                onApprove={onApprove}
              />)
            }
      </ExchangeItem>
  )
}