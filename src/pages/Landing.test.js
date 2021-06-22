import { cleanup, fireEvent } from '@testing-library/react';

import Landing, { wallets } from './Landing';
import { renderWithTheme } from '../utils/testing';

const testProps = {
  connectWallet: jest.fn(),
};

describe('Given the Landing component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(Landing, testProps);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should include required wallets', () => {
      const { getByText } = renderWithTheme(Landing, testProps);
      expect(getByText('Metamask')).toBeInTheDocument();
      expect(getByText('Ledger')).toBeInTheDocument();
      expect(getByText('Wallet Connect')).toBeInTheDocument();
      expect(getByText('Coinbase Wallet')).toBeInTheDocument();
    });

    describe('and user clicks on Wallet title', () => {
      it('should call connectWallet function with correct params', async () => {
        const { getByText } = renderWithTheme(Landing, testProps);

        fireEvent.click(getByText(wallets[0].title));
        fireEvent.click(getByText(wallets[1].title));
        fireEvent.click(getByText(wallets[2].title));
        fireEvent.click(getByText(wallets[3].title));

        expect(testProps.connectWallet).toHaveBeenCalledTimes(4);
      });
    });
  });
});
