import { cleanup } from '@testing-library/react';
import { Dimmer } from './Dimmer';
import { renderWithTheme } from '../../utils/testing';

describe('Given the Dimmer component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(Dimmer);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
