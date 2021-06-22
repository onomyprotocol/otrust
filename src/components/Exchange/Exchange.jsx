import React from 'react';

import { ExchangeWrapper } from './exchangeStyles';
import ExchangeQuote from './ExchangeQuote';

export default function Exchange() {
  return (
    <ExchangeWrapper>
      <ExchangeQuote strength="strong" />
      <ExchangeQuote strength="weak" />
    </ExchangeWrapper>
  );
}
