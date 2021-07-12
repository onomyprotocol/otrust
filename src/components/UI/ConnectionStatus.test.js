import { cleanup } from '@testing-library/react';
import { ConnectionStatus } from './ConnectionStatus';
import { renderWithTheme } from '../../utils/testing';

describe('Given the ConnectionStatus component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(ConnectionStatus);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
