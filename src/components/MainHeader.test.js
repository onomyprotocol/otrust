import { cleanup, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { BigNumber } from 'bignumber.js'
import { dark } from 'Theme/theme';
import { ChainContext } from '../context/chain/ChainContext';

import MainHeader from './MainHeader';

describe('Given the MainHeader component and supplyNOM, currentETHPrice are of BigNumber type', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = render(
      <ThemeProvider theme={ dark }>
        <ChainContext.Provider value={{supplyNOM: new BigNumber(0), currentETHPrice: new BigNumber(10)}} >
          <MainHeader />
         </ChainContext.Provider>
      </ThemeProvider>);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});

describe('Given the MainHeader component and supplyNOM, currentETHPrice are not of BigNumber type', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = render(
      <ThemeProvider theme={ dark }>
        <ChainContext.Provider value={{supplyNOM: 0, currentETHPrice: 10}} >
          <MainHeader />
         </ChainContext.Provider>
      </ThemeProvider>);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
