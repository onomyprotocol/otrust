import { cleanup } from '@testing-library/react';

import BridgeSwapModalDisconnected from './BridgeSwapModalDisconnected';
import { renderWithContext } from '../../../utils/testing';

describe('Given the BridgeSwapModalDisconnected component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithContext(BridgeSwapModalDisconnected);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
