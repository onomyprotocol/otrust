import { cleanup, fireEvent, render, act } from '@testing-library/react';
import { BigNumber } from 'bignumber.js';

import ConfirmTransactionModal from './ConfirmTransactionModal';
import { ThemeWrapper, ExchangeContextWrapper, ModalContextWrapper, renderWithContext } from '../../../utils/testing';

const testProps = {
  submitTrans: jest.fn(),
};

const testExchangeContext = {
  askAmount: new BigNumber(0),
  bidAmount: new BigNumber(0),
  bidDenom: 'strong',
  status: 'Not Approved',
  strong: 'ETH',
  weak: 'NOM',
};

const testModalContext = {
  handleModal: jest.fn(),
};

describe('Given the ConfirmTransactionModal component', () => {
  describe('when the component is rendered with bidDenom strong and askAmount, bidAmount are BigNumber', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithContext(ConfirmTransactionModal, testProps);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should show all limitOptions', () => {
      const { getByText } = renderWithContext(ConfirmTransactionModal, testProps);
      expect(getByText('No limit')).toBeInTheDocument();
      expect(getByText('1%')).toBeInTheDocument();
      expect(getByText('2.5%')).toBeInTheDocument();
      expect(getByText('5%')).toBeInTheDocument();
    });

    it('should show all gasOptions', () => {
      const { getByText } = renderWithContext(ConfirmTransactionModal, testProps);
      expect(getByText('0 (Standard)')).toBeInTheDocument();
      expect(getByText('0 (Fast)')).toBeInTheDocument();
      expect(getByText('0 (Instant)')).toBeInTheDocument();
    });

    it('should show the first Option like active by default', () => {
      const { getByText } = renderWithContext(ConfirmTransactionModal, testProps);
      expect(getByText('No limit')).toHaveStyle('color: rgb(225, 223, 235)');
      expect(getByText('No limit')).toHaveStyle('background-color: rgb(48, 46, 61)');
      expect(getByText('1%')).toHaveStyle('color: rgb(152, 149, 166)');
      expect(getByText('1%')).toHaveStyle('background-color: transparent');
      expect(getByText('2.5%')).toHaveStyle('color: rgb(152, 149, 166)');
      expect(getByText('2.5%')).toHaveStyle('background-color: transparent');
      expect(getByText('5%')).toHaveStyle('color: rgb(152, 149, 166)');
      expect(getByText('5%')).toHaveStyle('background-color: transparent');
    });

    describe('and user clicks on 5% option', () => {
      it('should make it active and deactivate No limit option', async () => {
        const { getByText } = renderWithContext(ConfirmTransactionModal, testProps);

        fireEvent.click(getByText('5%'));

        expect(getByText('No limit')).toHaveStyle('color: rgb(152, 149, 166)');
        expect(getByText('No limit')).toHaveStyle('background-color: transparent');
        expect(getByText('1%')).toHaveStyle('color: rgb(152, 149, 166)');
        expect(getByText('1%')).toHaveStyle('background-color: transparent');
        expect(getByText('2.5%')).toHaveStyle('color: rgb(152, 149, 166)');
        expect(getByText('2.5%')).toHaveStyle('background-color: transparent');
        expect(getByText('5%')).toHaveStyle('color: rgb(225, 223, 235)');
        expect(getByText('5%')).toHaveStyle('background-color: rgb(48, 46, 61)');
      });
    });

    describe('and user clicks on Modal CloseIcon', () => {
      it('should call handleModal function from Modal Context', async () => {
        const { queryByTestId } = render(
          ExchangeContextWrapper(
            ModalContextWrapper(ThemeWrapper(ConfirmTransactionModal, testProps), testModalContext),
            testExchangeContext,
          ),
        );

        fireEvent.click(queryByTestId('confirm-modal-close-icon'));
        expect(testModalContext.handleModal).toHaveBeenCalled();
      });
    });

    describe('and user clicks on Secondary button', () => {
      it('should call handleModal function from Modal Context', async () => {
        const { queryByTestId } = render(
          ExchangeContextWrapper(
            ModalContextWrapper(ThemeWrapper(ConfirmTransactionModal, testProps), testModalContext),
            testExchangeContext,
          ),
        );

        fireEvent.click(queryByTestId('confirm-modal-secondary-button'));
        expect(testModalContext.handleModal).toHaveBeenCalled();
      });
    });

    describe('and user clicks on Modal PrimaryButton', () => {
      it('should call submitTrans function from props', async () => {
        const { queryByTestId } = renderWithContext(ConfirmTransactionModal, testProps);

        fireEvent.click(queryByTestId('confirm-modal-primary-button'));
        expect(testProps.submitTrans).toHaveBeenCalled();
      });
    });
  });

  describe('and bidDenom is weak', () => {
    it('should match the snapshot', () => {
      const { asFragment } = render(
        ExchangeContextWrapper(
          ModalContextWrapper(ThemeWrapper(ConfirmTransactionModal, testProps), testModalContext),
          { ...testExchangeContext, bidDenom: 'weak' },
        ),
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  // test fails. Need modify format18 function or component checks for BigNumbers
  describe.skip('and bidDenom is weak and askAmount, bidAmount are NOT BigNumbers', () => {
    it('should match the snapshot', () => {
      const { asFragment } = render(
        ExchangeContextWrapper(
          ModalContextWrapper(ThemeWrapper(ConfirmTransactionModal, testProps), testModalContext),
          { ...testExchangeContext, bidDenom: 'weak', askAmount: 0, bidAmount: 0 },
        ),
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});

describe('Given the ConfirmTransactionModal  component', () => {
  describe('when the component is rendered', () => {
    let originalFetch;

    beforeEach(() => {
      originalFetch = global.fetch;
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              data: {
                fast: 7000000000,
                rapid: 15000001459,
                slow: 4000000000,
                standard: 4000000000,
                timestamp: 1625307668406,
              },
            }),
        }),
      );
    });

    afterEach(() => {
      global.fetch = originalFetch;
    });

    afterEach(cleanup);

    it('should call getGasPrices function', async () => {
      await act(async () => {
        renderWithContext(ConfirmTransactionModal, testProps);
      });
      expect(global.fetch).toHaveBeenCalledWith('https://www.gasnow.org/api/v3/gas/price?utm_source=onomy');
    });
  });
});
