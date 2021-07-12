import { cleanup, fireEvent, render, mount } from '@testing-library/react';
import { ModalContextWrapper, renderWithContext, ThemeWrapper } from 'utils/testing';

import ExchangeModals from './ExchangeModals';

const testModalContext = {
  handleModal: jest.fn(),
};

describe('Given an ExchangeModals component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithContext(ExchangeModals);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('and user clicks on ExchangeButton', () => {
    it('should open ', () => {
      const { queryByTestId, container } = render(ModalContextWrapper(ThemeWrapper(ExchangeModals), testModalContext));
      fireEvent.click(queryByTestId('exchanges-modals-buy-button'));
    });
  });

  describe('and user clicks on SellButton', () => {
    it('should call onApprove from the props', () => {
      const { queryByTestId } = render(ModalContextWrapper(ThemeWrapper(ExchangeModals), testModalContext));
      fireEvent.click(queryByTestId('exchanges-modals-sell-button'));
    });
  });
});
