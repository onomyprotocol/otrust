import React, { useEffect, useState, createContext, useContext } from 'react'
import { parseEther, formatEther } from "@ethersproject/units";

import { useChain } from 'context/chain/ChainContext'


export const SwapContext = createContext()
export const useSwap = () => useContext(SwapContext)

export const UpdateSwapContext = createContext()
export const useUpdateSwap = () => useContext(UpdateSwapContext)

function SwapProvider({ children }) {
    const { supplyNOM, supplyNOMRaw } = useChain()
    const { bondContract } = useChain()
    const [swapBuyAmount, setSwapBuyAmount] = useState(0)
    const [swapBuyResult, setSwapBuyResult] = useState('')
    const [swapDenom, setSwapDenom] = useState('ETH')
    const [swapSellAmount, setSwapSellAmount] = useState(0)
    const [swapSellResult, setSwapSellResult] = useState('')
    const [swapSupply, setSwapSupply] = useState([supplyNOM, supplyNOM])
    
    const contextValue = {
        swapBuyAmount,
        swapBuyResult,
        swapDenom,
        swapSellAmount,
        swapSupply,
        swapSellResult
    }

    const updateValue = {
        setSwapBuyAmount,
        setSwapBuyResult,
        setSwapDenom,
        setSwapSellAmount,
        setSwapSellResult,
        setSwapSupply
    }

    useEffect(() => {
        async function swapAmount() {
            switch (true) {
                case swapBuyAmount && parseFloat(swapBuyAmount) && parseFloat(swapBuyAmount).toString() === swapBuyAmount:
                    {

                        const amountNOMRaw = await bondContract.buyQuoteETH(parseEther(swapBuyAmount)) 
                        const amountNOM = parseFloat(formatEther(amountNOMRaw))
                        const supplyTop = supplyNOM + amountNOM
                        
                        setSwapBuyResult(amountNOM)
                        setSwapSupply([supplyNOM, supplyTop])
                    }
                    break
                case swapSellAmount && parseFloat(swapSellAmount) && parseFloat(swapSellAmount).toString() === swapSellAmount:
                    
                    if (swapSellAmount < supplyNOM) {
                        const amountETHRaw = await bondContract.sellQuoteNOM(parseEther(swapSellAmount));
                        const amountETH = parseFloat(formatEther(amountETHRaw))
                        const supplyBot = supplyNOM - swapSellAmount

                        setSwapSellResult(amountETH)
                        setSwapSupply([supplyBot, supplyNOM])
                    } else {
                        setSwapSellResult("Too much NOM")
                    }
                    
                    break
                default:
                    {
                        setSwapBuyResult('')
                        setSwapSellResult('')
                        setSwapSupply([supplyNOM, supplyNOM])
                    }
            }
        }
        swapAmount()
    }, [bondContract, supplyNOM, supplyNOMRaw, swapBuyAmount, swapSellAmount])

    return (
        <UpdateSwapContext.Provider value={updateValue}>
            <SwapContext.Provider value={contextValue} >
                {children}
            </SwapContext.Provider>
        </UpdateSwapContext.Provider>
    )
}

export default SwapProvider