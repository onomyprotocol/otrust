import { cleanup } from '@testing-library/react';

import SidebarFooter from './SidebarFooter';
import { renderWithTheme } from '../../utils/testing';

describe('Given the SidebarFooter component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(SidebarFooter);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
