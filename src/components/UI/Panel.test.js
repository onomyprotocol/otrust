import { cleanup } from '@testing-library/react';
import { Panel } from './Panel';
import { renderWithTheme } from '../../utils/testing';

describe('Given the Panel component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(Panel);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
