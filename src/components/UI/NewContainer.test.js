import { cleanup } from '@testing-library/react';
import { Container } from './NewContainer';
import { renderWithTheme } from '../../utils/testing';

describe('Given the NewContainer component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(Container);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
