import { ThemeProvider } from 'styled-components';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/client';
import { render } from '@testing-library/react';
import { BigNumber } from 'bignumber.js';

import { darkNew } from 'Theme/theme';
import { ChainContext } from '../context/chain/ChainContext';
import { ExchangeContext } from '../context/exchange/ExchangeContext';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

export const renderWithTheme = (Component, props, children) => {
  if (children) {
    return render(
      <ThemeProvider theme={darkNew}>
        <Component {...props}>{children}</Component>
      </ThemeProvider>,
    );
  }
  return render(
    <ThemeProvider theme={darkNew}>
      <Component {...props} />
    </ThemeProvider>,
  );
};

export const renderWithContext = (Component, props) => {
  return render(
    <ThemeProvider theme={darkNew}>
      <ApolloProvider client={client}>
        <ChainContext.Provider value={{ supplyNOM: new BigNumber(0), theme: darkNew }}>
          <ExchangeContext.Provider value={{ askAmount: 0, bidAmount: 0, bidDenom: 'strong' }}>
            <Component {...props} />
          </ExchangeContext.Provider>
        </ChainContext.Provider>
      </ApolloProvider>
    </ThemeProvider>,
  );
};
