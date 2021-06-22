import { cleanup, fireEvent } from '@testing-library/react';

import Dropdown from './Dropdown';
import { renderWithTheme } from '../utils/testing';

const testProps = {
  setDenom: jest.fn(),
  denom: 'DENOM',
};

describe('Given the Dropdown component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(Dropdown, testProps);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should include denom value in the header if denom was provided in the props', () => {
      const { getByText } = renderWithTheme(Dropdown, testProps);
      expect(getByText('DENOM')).toBeInTheDocument();
    });

    it('should include ETH value in the header if denom was not provided in the props', () => {
      const { getByText } = renderWithTheme(Dropdown, { ...testProps, denom: undefined });
      expect(getByText('ETH')).toBeInTheDocument();
    });

    it('should not show dropdown container', () => {
      const { queryByTestId } = renderWithTheme(Dropdown, testProps);
      expect(queryByTestId('dropdown-list-container')).toBeNull();
    });

    describe('and user clicks on dropdown header', () => {
      it('should show dropdown list container', async () => {
        const { queryByTestId } = renderWithTheme(Dropdown, testProps);
        fireEvent.click(queryByTestId('dropdown-header'));
        expect(queryByTestId('dropdown-list-container')).toBeInTheDocument();
      });

      describe('and user clicks on dropdown item', () => {
        it('should call setDenom function with option value in function params and hide dropdown-list-container', async () => {
          const { queryByTestId } = renderWithTheme(Dropdown, testProps);
          fireEvent.click(queryByTestId('dropdown-header'));
          fireEvent.click(queryByTestId('ETH'));
          expect(testProps.setDenom).toHaveBeenCalled();
          expect(testProps.setDenom).toHaveBeenCalledWith('ETH');
          expect(queryByTestId('dropdown-list-container')).toBeNull();
        });
      });
    });
  });
});
