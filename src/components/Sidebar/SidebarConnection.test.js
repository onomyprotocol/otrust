import { cleanup } from '@testing-library/react';

import SidebarConnection from './SidebarConnection';
import { renderWithTheme } from '../../utils/testing';

const testProps = {
  active: true,
  error: false,
  chainId: '123',
  blockNumber: 123456,
};

describe('Given the SidebarConnection component', () => {
  describe('when the component is rendered and active property is true', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment, getByText } = renderWithTheme(SidebarConnection, testProps);
      expect(asFragment()).toMatchSnapshot();
      expect(getByText('Connected')).toBeInTheDocument();
    });
  });

  describe('when the component is rendered and active is false, error is true', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment, getByText } = renderWithTheme(SidebarConnection, {
        ...testProps,
        active: false,
        error: true,
      });
      expect(asFragment()).toMatchSnapshot();
      expect(getByText('Error')).toBeInTheDocument();
    });
  });

  describe('when the component is rendered has inactive state and has no errors', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment, getByText } = renderWithTheme(SidebarConnection, {
        ...testProps,
        active: false,
        blockNumber: undefined,
        chainId: null,
      });
      expect(asFragment()).toMatchSnapshot();
      expect(getByText('Loading')).toBeInTheDocument();
    });
  });
});
