import { cleanup, fireEvent, render } from '@testing-library/react';
import { BigNumber } from 'bignumber.js';

import TransactionCompletedModal from './TransactionCompletedModal';
import {
  ThemeWrapper,
  UpdateExchangeContextWrapper,
  ExchangeContextWrapper,
  ModalContextWrapper,
} from '../../../utils/testing';

const testProps = {
  tx: {
    chainId: 1,
    hash: 'hash-code',
    from: '12345678912345678912345',
    to: '12345678912345678912348',
    confirmations: 0,
  },
};

const testUpdateExchangeContext = {
  objDispatch: jest.fn(),
  strDispatch: jest.fn(),
  setInputPending: false,
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

describe('Given the TransactionCompletedModal component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = render(
        UpdateExchangeContextWrapper(
          ExchangeContextWrapper(
            ModalContextWrapper(ThemeWrapper(TransactionCompletedModal, testProps)),
            testExchangeContext,
          ),
          testUpdateExchangeContext,
        ),
      );
      expect(asFragment()).toMatchSnapshot();
    });

    describe('and confirmations > 0', () => {
      it('should match the snapshot', () => {
        const testPropsConfirmationOne = JSON.parse(JSON.stringify(testProps));
        testPropsConfirmationOne.tx.confirmations = 1;
        const { asFragment } = render(
          UpdateExchangeContextWrapper(
            ExchangeContextWrapper(
              ModalContextWrapper(ThemeWrapper(TransactionCompletedModal, testPropsConfirmationOne)),
              testExchangeContext,
            ),
            testUpdateExchangeContext,
          ),
        );
        expect(asFragment()).toMatchSnapshot();
      });
    });

    describe('and status in useExchange context is not APPROVE and bidDenom is strong', () => {
      it('should show ExchangeResult, ExchangeRateWrapper and do not show ExchangeApproveText, FooterDetails', () => {
        const { queryByTestId } = render(
          UpdateExchangeContextWrapper(
            ExchangeContextWrapper(
              ModalContextWrapper(ThemeWrapper(TransactionCompletedModal, testProps)),
              testExchangeContext,
            ),
            testUpdateExchangeContext,
          ),
        );

        expect(queryByTestId('completed-modal-exchange-result')).toBeInTheDocument();
        expect(queryByTestId('completed-modal-exchange-rate')).toBeInTheDocument();
        expect(queryByTestId('completed-exchange-approve-text')).not.toBeInTheDocument();
        expect(queryByTestId('completed-modal-footer-details')).not.toBeInTheDocument();
      });
    });

    describe('and status in useExchange context is not APPROVE and bidDenom is NOT strong', () => {
      it('should show ExchangeResult, ExchangeRateWrapper sections and do not show ExchangeApproveText', () => {
        const { queryByTestId } = render(
          UpdateExchangeContextWrapper(
            ExchangeContextWrapper(ModalContextWrapper(ThemeWrapper(TransactionCompletedModal, testProps)), {
              ...testExchangeContext,
              bidDenom: 'weak',
            }),
            testUpdateExchangeContext,
          ),
        );

        expect(queryByTestId('completed-modal-exchange-result')).toBeInTheDocument();
        expect(queryByTestId('completed-modal-exchange-rate')).toBeInTheDocument();
        expect(queryByTestId('completed-exchange-approve-text')).not.toBeInTheDocument();
      });
    });

    describe('and status in useExchange context is APPROVE', () => {
      it('should NOT show ExchangeResult, ExchangeRateWrapper, FooterDetails and show ExchangeApproveText', () => {
        const { queryByTestId } = render(
          UpdateExchangeContextWrapper(
            ExchangeContextWrapper(ModalContextWrapper(ThemeWrapper(TransactionCompletedModal, testProps)), {
              ...testExchangeContext,
              status: 'APPROVE',
            }),
            testUpdateExchangeContext,
          ),
        );
        expect(queryByTestId('completed-modal-exchange-result')).not.toBeInTheDocument();
        expect(queryByTestId('completed-modal-exchange-rate')).not.toBeInTheDocument();
        expect(queryByTestId('completed-exchange-approve-text')).toBeInTheDocument();
        expect(queryByTestId('completed-modal-footer-details')).not.toBeInTheDocument();
      });
    });

    describe('and user clicks on CloseIcon', () => {
      it('should call objDispatch from useUpdateExchange context with correct parameters', () => {
        let objUpdate = new Map();
        objUpdate.set('askAmount', new BigNumber(0));
        objUpdate.set('bidAmount', new BigNumber(0));

        let strUpdate = new Map();
        strUpdate.set('input', '');
        strUpdate.set('output', '');

        const { queryByTestId } = render(
          UpdateExchangeContextWrapper(
            ExchangeContextWrapper(
              ModalContextWrapper(ThemeWrapper(TransactionCompletedModal, testProps), testModalContext),
              testExchangeContext,
            ),
            testUpdateExchangeContext,
          ),
        );
        fireEvent.click(queryByTestId('completed-modal-close-icon'));

        expect(testUpdateExchangeContext.objDispatch).toHaveBeenCalled();
        expect(testUpdateExchangeContext.strDispatch).toHaveBeenCalled();
        expect(testModalContext.handleModal).toHaveBeenCalled();

        expect(testUpdateExchangeContext.objDispatch).toHaveBeenCalledWith({
          type: 'update',
          value: objUpdate,
        });

        expect(testUpdateExchangeContext.strDispatch).toHaveBeenCalledWith({
          type: 'update',
          value: strUpdate,
        });
      });
    });

    describe('and user clicks on PrimaryButton', () => {
      it('should call objDispatch from useUpdateExchange context with correct parameters', () => {
        let objUpdate = new Map();
        objUpdate.set('askAmount', new BigNumber(0));
        objUpdate.set('bidAmount', new BigNumber(0));

        let strUpdate = new Map();
        strUpdate.set('input', '');
        strUpdate.set('output', '');

        const { queryByTestId } = render(
          UpdateExchangeContextWrapper(
            ExchangeContextWrapper(
              ModalContextWrapper(ThemeWrapper(TransactionCompletedModal, testProps), testModalContext),
              testExchangeContext,
            ),
            testUpdateExchangeContext,
          ),
        );
        fireEvent.click(queryByTestId('completed-modal-close-icon'));

        expect(testUpdateExchangeContext.objDispatch).toHaveBeenCalled();
        expect(testUpdateExchangeContext.strDispatch).toHaveBeenCalled();
        expect(testModalContext.handleModal).toHaveBeenCalled();

        expect(testUpdateExchangeContext.objDispatch).toHaveBeenCalledWith({
          type: 'update',
          value: objUpdate,
        });

        expect(testUpdateExchangeContext.strDispatch).toHaveBeenCalledWith({
          type: 'update',
          value: strUpdate,
        });
      });
    });

    describe('and user clicks on DetailsButton', () => {
      it('should show FooterDetails section', () => {
        const { queryByTestId } = render(
          UpdateExchangeContextWrapper(
            ExchangeContextWrapper(
              ModalContextWrapper(ThemeWrapper(TransactionCompletedModal, testProps), testModalContext),
              testExchangeContext,
            ),
            testUpdateExchangeContext,
          ),
        );
        fireEvent.click(queryByTestId('completed-modal-details-button'));
        expect(queryByTestId('completed-modal-footer-details')).toBeInTheDocument();
      });
    });

    describe('and user clicks on DetailsButton and on ExplorerButton', () => {
      it('should show FooterDetails section', () => {
        window.open = jest.fn();
        const { queryByTestId } = render(
          UpdateExchangeContextWrapper(
            ExchangeContextWrapper(
              ModalContextWrapper(ThemeWrapper(TransactionCompletedModal, testProps), testModalContext),
              testExchangeContext,
            ),
            testUpdateExchangeContext,
          ),
        );
        fireEvent.click(queryByTestId('completed-modal-details-button'));
        fireEvent.click(queryByTestId('completed-model-explorer-button'));

        expect(window.open).toHaveBeenCalled();
        expect(window.open).toHaveBeenCalledWith('https://etherscan.io/tx/hash-code', '_blank');
      });
    });
  });
});
