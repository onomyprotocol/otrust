import { cleanup } from '@testing-library/react';

import Exchange from './Exchange';
import { renderWithContext } from 'utils/testing';

describe('Given an Exchange component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', async () => {
      const { asFragment } = renderWithContext(Exchange);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
