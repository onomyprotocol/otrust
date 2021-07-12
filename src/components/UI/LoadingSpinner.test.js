import { cleanup } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';
import { renderWithTheme } from '../../utils/testing';

describe('Given the LoadingSpinner component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(LoadingSpinner);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
