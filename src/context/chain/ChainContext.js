import React, { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { formatEther, parseEther } from '@ethersproject/units'
import { useWeb3React } from "@web3-react/core"
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from '@apollo/client'

import { NOMCont, BondingCont } from './contracts'
import addrs from 'context/chain/NOMAddrs.json';
import BigNumber from 'bignumber.js';

export const ChainContext = createContext()
export const useChain = () => useContext(ChainContext)

export const UpdateChainContext = createContext()
export const useUpdateChain = () => useContext(UpdateChainContext)

function ChainProvider({ theme, children }) {
    const { account, library } = useWeb3React()
    const [blockNumber, setBlockNumber] = useState()
    const [ETHbalance, setETHBalance] = useState()
    const [NOMbalance, setNOMBalance] = useState()
    const [NOMallowance, setNOMAllowance] = useState(0)
    const [supplyNOM, setSupplyNOM] = useState()
    const bondContract = BondingCont(library)
    const NOMcontract = NOMCont(library)
    const [pendingTx, setPendingTx] = useState()
    // const [waitModal, setWaitModal] = useState(false)
    const [currentETHPrice, setCurrentETHPrice] = useState(new BigNumber(0))
    const [currentNOMPrice, setCurrentNOMPrice] = useState(new BigNumber(0))

    if (!process.env.REACT_APP_GRAPHQL_ENDPOINT) {
        throw new Error('REACT_APP_GRAPHQL_ENDPOINT environment variable not defined')
    }

    const client = new ApolloClient({
        uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
        cache: new InMemoryCache(),
    })

    const getCurrentPrice = useCallback(async () => {
        let amount;
        amount = await bondContract.buyQuoteETH(parseEther('1'));
        setCurrentETHPrice(parseFloat(formatEther(amount)));
        amount = await bondContract.sellQuoteNOM(parseEther('1'));
        setCurrentNOMPrice(parseFloat(formatEther(amount)));
    },[bondContract])

    useEffect(() => {
        async function blocker() {
            // listen for changes on an Ethereum address
            library.on('block', async (number) => {
                setBlockNumber(number)
                Promise.all(
                    [
                        library.getBalance(account),
                        NOMcontract.balanceOf(account),
                        NOMcontract.allowance(account, addrs.BondingNOM),
                        bondContract.getSupplyNOM(),
                        getCurrentPrice()  
                    ]
                ).then((values) => {
                    setETHBalance(parseFloat(formatEther(values[0])))
                    setNOMBalance(parseFloat(formatEther(values[1])))
                    setNOMAllowance(parseFloat(formatEther(values[2])))
                    setSupplyNOM(parseFloat(formatEther(values[3])))
                }).catch((err) => { console.log(err) })
            })
            // remove listener when the component is unmounted
            return () => {
                library.removeAllListeners('block')
            }
            // trigger the effect only on component mount
        }
        blocker()
    }, [NOMcontract, account, bondContract, library, getCurrentPrice])

    const contextValue = {
        blockNumber,
        bondContract,
        currentETHPrice,
        currentNOMPrice,
        ETHbalance,
        NOMallowance,
        NOMbalance,
        NOMcontract,
        supplyNOM,
        theme,
        pendingTx
    }

    const updateValue = {
        setPendingTx
    }

    return (
        <ApolloProvider client={client}>
            <UpdateChainContext.Provider value={updateValue}>
                <ChainContext.Provider value={contextValue} >
                    {children}
                </ChainContext.Provider>
            </UpdateChainContext.Provider>
        </ApolloProvider>
    )
}

export default ChainProvider
