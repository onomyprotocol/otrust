import { cleanup } from '@testing-library/react';
import { Container, FullBackgroundContainer } from './Container';
import { renderWithTheme } from '../../utils/testing';

describe('Given the Container component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(Container);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});

describe('Given the FullBackgroundContainer component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(FullBackgroundContainer, 'img', 'Children');
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
