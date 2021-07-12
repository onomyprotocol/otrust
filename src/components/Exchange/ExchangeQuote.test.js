import { cleanup, fireEvent } from '@testing-library/react';
import { renderWithContext } from 'utils/testing';

import ExchangeQuote from './ExchangeQuote';

describe('Given an ExchangeQuote component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithContext(ExchangeQuote);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when strong balance changed', () => {
    it('should updated the ask amount', () => {
      const { getByTestId } = renderWithContext(ExchangeQuote);
      const receivingValue = getByTestId('exchange-weak-balance');

      fireEvent.change(getByTestId('exchange-strong-balance-input'), { target: { value: '1' } });

      expect(receivingValue).toHaveTextContent('ETH');
    });
  });

  describe('when max button clicked', () => {
    it('should calculated max balace correctly', () => {
      const { queryByTestId } = renderWithContext(ExchangeQuote);
      const receivingValue = queryByTestId('exchange-weak-balance');

      fireEvent.click(queryByTestId('max-value-button'));

      expect(receivingValue).toHaveTextContent('ETH');
    });
  });
});
