import React, { useCallback } from 'react'
import styled from 'styled-components'
import { responsive } from "theme/constants"

import { useAsyncFn } from 'lib/use-async-fn'
import { borderRadius } from 'context/responsive/cssSizes'
import { useSwap, useUpdateSwap } from 'context/SwapContext'
import { useChain, useUpdateChain } from 'context/chain/ChainContext'
import { parseEther } from '@ethersproject/units'

const adjustedRadius = `${parseFloat(borderRadius.slice(0,-3))*2/3}rem`;

const ExchangeItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 49.5%;
  height: 100%;
  padding: 0 40px;
  @media screen and (max-width: ${responsive.laptop}) {
    padding: 0 24px;
  }
  > strong {
    margin-bottom: 12px;
    font-size: 16px;
    @media screen and (max-width: ${responsive.laptop}) {
      font-size: 14px;
    }
  }
`

const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  gap: 0.8rem 0rem;
  margin-top: 1rem;
`

const ExchangeInput = styled.input`
  width: 100%;
  height: 2.5rem;
  text-align: ${props => props.isBuyButton?'right':'center'};
  padding: 0rem .2rem;
  border: .1rem solid ${props => props.theme.colors.bgNormal};
  border-radius: ${adjustedRadius};
  color: ${props => props.isBuyButton? props.theme.colors.txtPrimary:props.theme.colors.txtSecondary};
  font-size: .8rem;
  box-sizing: border-box;
  background-color: ${props => props.theme.colors.bgHighlight};

  ::placeholder {
    color: ${props => props.isBuyButton? props.theme.colors.txtPrimary:props.theme.colors.txtSecondary};
  }

  &:focus {
    outline: none;
    ::placeholder {
      color: ${props => props.theme.colors.txtPrimary};
    }
  }
`

const RightComponent = styled.div`
  text-align: right;
  padding: 0rem 0.6rem;
  color: ${props => props.isBuyButton?props.theme.colors.txtPrimary:props.theme.colors.txtSecondary};
`

const LeftComponent = styled.div`
  width: 24%;
  text-align: left;
  padding: 0rem 0.5rem 0rem 1rem;
  color: ${props => props.theme.colors.txtSecondary};
`

const MiddleComponent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 52%;
  text-align: right;
  align-items: center;
  color: ${props => props.isBuyButton?props.theme.colors.txtPrimary:props.theme.colors.txtSecondary};
`

const TextLabel = styled.div`
  padding: 0rem 0.2rem;
  height: '2.2rem';
`

const MaxLabel = styled.span`
  color: ${props => props.isBuyButton?props.theme.colors.txtHighlight: props.theme.colors.txtSecondary};
  font-weight: ${props => props.isBuyButton?'bold':'normal'};
  text-align: right;
`

const SwapHeader = styled.header`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.txtPrimary};
  margin: 1rem 0rem;
  height: 3rem;
  line-height: 3rem;
  background: ${props => props.theme.colors.bgNormal};
  text-align: left;
`

const Sending = styled.div` 
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  height: 3.3rem;
  font-size: 0.65rem;
  border-radius: ${adjustedRadius};
  border: 0.1rem solid ${props => props.theme.colors.bgHighlight};
`

const Receiving = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  height: 3.3rem;
  font-size: 0.65rem;
  background-color: ${props => props.theme.colors.bgDarken};
  border-radius : 0.3rem;
`

const ExchangeButton = styled.button`
  width: 100%;
  height: 3.3rem;
  margin-bottom: 2rem;
  border: none;
  border-radius: ${adjustedRadius};  

  text-align: center;
  font-size: 0.7rem;
  font-weight: 600;
  text-shadow: 0 6px 3px rgba(0, 0, 0, 0.03);
  color: ${props => props.isBuyButton?props.theme.colors.txtPrimary: props.theme.colors.txtSecondary};

  background-color: ${props => props.theme.colors.bgHighlight}; 
  background-image: ${props => props.isBuyButton?props.colorGradient : props.theme.colors.bgHighlight};
  
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.bgDarken};
    color: ${props => props.theme.colors.bgHighlight};
  }
`


export default function Swap({text, colorGradient,onInputChange, isBuyButton}) {

  const { swapDenom, swapBuyAmount, swapSellAmount } = useSwap()
  const { setSwapBuyAmount, setSwapDenom } = useUpdateSwap()
  const onTextChange = useCallback(evt => setSwapBuyAmount(evt.target.value), [setSwapBuyAmount])
  const { bondContract, NOMcontract } = useChain()
  const { setPendingTx } = useUpdateChain()
  let clicked = 'Buy Now'
 

  const submitTrans = useCallback(
   
    async evt => {
      if (evt) evt.preventDefault()
      if (!swapBuyAmount) return
      try {
        if (swapDenom === 'ETH') {
          try {
            const tx = await bondContract.buyNOM({value: parseEther(swapBuyAmount.toString()).toString()})
            setPendingTx(tx)
            setSwapBuyAmount('')
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e.stack || e)
            setSwapBuyAmount(swapBuyAmount)
          }
        } else {
          let tx = await NOMcontract.increaseAllowance(bondContract.address, parseEther(swapBuyAmount.toString()))
          setPendingTx(tx)
          tx = await bondContract.sellNOM(parseEther(swapBuyAmount.toString()))
          setPendingTx(tx)
          setSwapBuyAmount('')
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e.stack || e)
        setSwapBuyAmount(swapBuyAmount)
      }
    },[swapBuyAmount, swapDenom, bondContract, NOMcontract, setSwapBuyAmount, setPendingTx]
  )

  const [onSubmit, isWorking, error] = useAsyncFn(submitTrans)


  //When input number on the Buy or Sell component input area
  const  onButtonChange= (e) => {

    if(clicked !== e.target.name)setSwapBuyAmount('')

    clicked = e.target.name
    if(clicked==="Sell NOM") {
      onInputChange('NOM')
      setSwapDenom('NOM')
    } else{
      onInputChange('ETH')  
      setSwapDenom('ETH') 
    }           
  }

  return (
    <ExchangeItem name={text} >
      <form onSubmit={ onSubmit } >
        <SwapHeader>
          {text}
        </SwapHeader>
        <GridWrapper>
          <Sending>
            <LeftComponent>
                I'm sending
            </LeftComponent>
            { error ? error : null }
            <MiddleComponent isBuyButton={isBuyButton}>
              <ExchangeInput
                type='text'
                value={isBuyButton?swapBuyAmount:''}
                name={text}
                onChange={onTextChange}
                onClick={onButtonChange}
                placeholder={isWorking ? "Confirming":(isBuyButton?'':"Enter amount to switch")}
                isBuyButton={isBuyButton}
              />
              <TextLabel >
                {text==='Buy NOM'? 'ETH' : 'NOM'} 
              </TextLabel> 
            </MiddleComponent>
              
              <RightComponent>
                <MaxLabel isBuyButton={isBuyButton}>Max</MaxLabel>
              </RightComponent>
          </Sending>

          <Receiving>
            <LeftComponent>
                I'm receiving
            </LeftComponent>           
            <RightComponent isBuyButton={isBuyButton}>
                { `${!isBuyButton?'': (swapSellAmount ? parseFloat(swapSellAmount).toPrecision(6) : '')} ${text==='Buy NOM'? 'NOM' : 'ETH'}` }
            </RightComponent>
          </Receiving>                                           
          <ExchangeButton colorGradient={colorGradient} type='submit' isBuyButton={isBuyButton} disabled={isBuyButton?false:true}>
              {text}
          </ExchangeButton>             
        </GridWrapper>
      </form>
    </ExchangeItem>
  )
}
