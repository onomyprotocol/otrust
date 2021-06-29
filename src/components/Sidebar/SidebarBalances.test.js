import { cleanup } from '@testing-library/react';

import SidebarBalances from './SidebarBalances';
import { renderWithTheme } from '../../utils/testing';

const testProps = {
  strong: 'ETH',
  weak: 'NOM',
  strongBalance: 100,
  weakBalance: 50,
};

describe('Given the SidebarBalances component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(SidebarBalances, testProps);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
