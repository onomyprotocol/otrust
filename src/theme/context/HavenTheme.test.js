import { cleanup, fireEvent, render } from '@testing-library/react';

import { HavenTheme, ThemePage } from './HavenTheme';
import { renderWithTheme } from '../../utils/testing';

const testProps = {
  setTheme: jest.fn(),
}

describe('Given the HavenTheme component', () => {
  describe('when the component is rendered and localStorage includes the dark theme', () => {
    afterEach(cleanup);
    beforeEach(() => {
      Object.defineProperty(window, "localStorage", {
        value: {
          getItem: jest.fn(() => 'dark'),
          setItem: jest.fn(() => null)
        },
        writable: true
      });
    });

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(HavenTheme, undefined, 'Children');
      expect(asFragment()).toMatchSnapshot();
    });

    it('should check if localStaorage includes the theme property', () => {
      renderWithTheme(HavenTheme, undefined, 'Children');
      expect(window.localStorage.getItem).toHaveBeenCalledWith('theme');
      expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Given the ThemePage component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(ThemePage, testProps);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should call setTheme function when user clicks light or dark buttons with appropriate parameter', () => {
      const { getByText } = renderWithTheme(ThemePage, testProps);
      fireEvent.click(getByText('light'));
      fireEvent.click(getByText('dark'));
      expect(testProps.setTheme).toHaveBeenCalledTimes(2);
      expect(testProps.setTheme).toHaveBeenCalledWith('light');
      expect(testProps.setTheme).toHaveBeenCalledWith('dark');
    });
  });
});
