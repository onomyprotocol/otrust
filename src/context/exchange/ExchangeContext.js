import React, { createContext, useContext, useReducer, useState } from 'react';
import { BigNumber } from 'bignumber.js';

import { exchStringReducer, exchObjReducer } from 'context/exchange/ExchangeReducer';

export const ExchangeContext = createContext();
export const useExchange = () => useContext(ExchangeContext);

export const UpdateExchangeContext = createContext();
export const useUpdateExchange = () => useContext(UpdateExchangeContext);

function ExchangeProvider({ children }) {
  const [inputPending, setInputPending] = useState(false);

  const [objState, objDispatch] = useReducer(exchObjReducer, {
    askAmount: new BigNumber(0),
    bidAmount: new BigNumber(0),
    approveAmount: new BigNumber(0),
    pendingTx: null,
    slippage: new BigNumber(0),
    txPending: false,
  });

  const [strState, strDispatch] = useReducer(exchStringReducer, {
    bidDenom: 'strong',
    input: '',
    output: '',
    approve: '',
    status: '',
    strong: 'ETH',
    weak: 'wNOM',
  });

  const contextValue = {
    ...objState,
    ...strState,
    inputPending,
  };

  const updateValue = {
    objDispatch,
    strDispatch,
    setInputPending,
  };

  return (
    <UpdateExchangeContext.Provider value={updateValue}>
      <ExchangeContext.Provider value={contextValue}>{children}</ExchangeContext.Provider>
    </UpdateExchangeContext.Provider>
  );
}

export default ExchangeProvider;
