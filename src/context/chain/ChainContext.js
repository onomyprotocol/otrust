import React, { useReducer, useEffect, createContext, useContext } from 'react'
import { useWeb3React } from "@web3-react/core"
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from '@apollo/client'
import { BondingCont, NOMCont, contAddrs } from 'context/chain/contracts'
import { BigNumber } from 'bignumber.js'
import { reducer } from 'context/chain/ChainReducer'

export const ChainContext = createContext()
export const useChain = () => useContext(ChainContext)

export const UpdateChainContext = createContext()
export const useUpdateChain = () => useContext(UpdateChainContext)

function ChainProvider({ theme, children }) {
    
    const { account, library } = useWeb3React()
    const bondContract = BondingCont(library)
    const NOMContract = NOMCont(library)
    const [state, dispatch] = useReducer(reducer, { 
        blockNumber: new BigNumber(0),
        currentETHPrice: new BigNumber(0),
        currentNOMPrice: new BigNumber(0),
        gasOptions: [
            {
            id: 0,
            text: "0 (Standard)",
            },
            {
            id: 1,
            text: "0 (Fast)",
            },
            {
            id: 2,
            text: "0 (Instant)",
            },
        ],
        NOMallowance: new BigNumber(0),
        strongBalance: new BigNumber(0),
        supplyNOM: new BigNumber(0),
        weakBalance: new BigNumber(0)
    })
    
    if (!process.env.REACT_APP_GRAPHQL_ENDPOINT) {
        throw new Error('REACT_APP_GRAPHQL_ENDPOINT environment variable not defined')
    }

    const client = new ApolloClient({
        uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
        cache: new InMemoryCache(),
    })

    const getGasOptions = async () => {
        const prices = await fetch('https://www.gasnow.org/api/v3/gas/price?utm_source=onomy');
            const result = await prices.json();
        
        let gasOptions = [
            {
                id: 0,
                text: "0 (Standard)",
                gas: new BigNumber(0)
            },
            {
                id: 1,
                text: "0 (Fast)",
                gas: new BigNumber(0)
            },
            {
                id: 2,
                text: "0 (Instant)",
                gas: new BigNumber(0)
            }
        ]
                    
        gasOptions[0].text = result.data.standard / 1e9 + " (Standard)";
        gasOptions[1].text = result.data.fast / 1e9 + " (Fast)";
        gasOptions[2].text = result.data.rapid / 1e9 + " (Instant)";
        gasOptions[0].gas = new BigNumber((result.data.standard / 1e9).toString())
        gasOptions[1].gas = new BigNumber((result.data.fast / 1e9).toString())
        gasOptions[2].gas = new BigNumber((result.data.rapid / 1e9).toString())

        return gasOptions
    }

    useEffect(() => {
        // listen for changes on an Ethereum address
        library.on('block', async (number) => {
            if (state.blocknumber !== number) {
                try {
                    await Promise.all(
                        [
                            // Current ETH Price & Current NOM Price
                            bondContract.buyQuoteETH((10**18).toString()),
                            // NOM Allowance
                            NOMContract.allowance(account, contAddrs.BondingNOM),
                            // Strong Balance
                            library.getBalance(account),
                            // Supply NOM
                            bondContract.getSupplyNOM(),
                            // Weak Balance (May need to move these to Exchange)
                            NOMContract.balanceOf(account),
                            number,
                            getGasOptions()
                            // UniSwap Pricing
                            // UniSwapCont.getReserves(),
                        ]
                    ).then(values => {
                        let update = new Map()
                        for (let i = 0; i < values.length; i++) {
                            switch (i) {
                                case 0: 
                                    update = update.set(
                                        'currentETHPrice', 
                                        new BigNumber(values[0].toString())
                                    )

                                    update = update.set(
                                        'currentNOMPrice', 
                                        (new BigNumber(1)).div(new BigNumber(values[0].toString()))
                                    )
                                    break

                                case 1: 
                                    update = update.set(
                                        'NOMallowance', 
                                        new BigNumber(values[1].toString())
                                    )
                                    break

                                case 2: 
                                    update = update.set(
                                        'strongBalance',
                                        new BigNumber(values[2].toString())
                                    )
                                    break

                                case 3: 
                                    update = update.set(
                                        'supplyNOM', 
                                        new BigNumber(values[3].toString())
                                    )
                                    break

                                case 4: 
                                    update = update.set(
                                        'weakBalance', 
                                        new BigNumber(values[4].toString())
                                    )
                                    break

                                case 5:
                                    update = update.set(
                                        'blockNumber', 
                                        new BigNumber(number.toString())
                                    )
                                    break
                                case 6:
                                    update = update.set(
                                        'gasOptions', 
                                        values[6]
                                    )
                                    break
                                default: break
                            }
                        }
                        dispatch({type: 'updateAll', value: update})
                    })
                } catch {
                    console.log("Failed Chain Promise")
                }
            }
        })
        // remove listener when the component is unmounted
        return () => {
          library.removeAllListeners('block')
        }
        // trigger the effect only on component mount
    })
    

    const contextValue = {
        ...state,
        theme
    }

    return (
        <ApolloProvider client={client}>
            <UpdateChainContext.Provider value={dispatch}>
                <ChainContext.Provider value={contextValue} >
                    {children}
                </ChainContext.Provider>
            </UpdateChainContext.Provider>
        </ApolloProvider>
    )
}

export default ChainProvider
