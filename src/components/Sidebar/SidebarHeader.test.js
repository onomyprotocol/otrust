import { cleanup } from '@testing-library/react';

import SidebarHeader from './SidebarHeader';
import { renderWithTheme } from '../../utils/testing';

const testProps = {
  setDenom: jest.fn(),
  account: '123456789012',
};

describe('Given the SidebarHeader component', () => {
  describe('when the component is rendered and account is defined', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(SidebarHeader, testProps);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('when the component is rendered and account is null', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(SidebarHeader, { account: null });
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
