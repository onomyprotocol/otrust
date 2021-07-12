import { cleanup, fireEvent, render } from '@testing-library/react';
import { AccentButton, Button, InvisibleButton } from './Button';
import { renderWithTheme } from '../../utils/testing';
import { ThemeProvider } from 'styled-components';
import { darkNew } from 'Theme/theme';

const testProps = {
  width: 50,
};

const clickFN = jest.fn();

describe('Given the AccentButton component and width is provided in the props', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(AccentButton, testProps);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should work click AccentButton', () => {
      const { getByRole } = render(
        <ThemeProvider theme={darkNew}>
          <AccentButton onClick={clickFN} />
        </ThemeProvider>,
      );

      const button = getByRole('button');
      fireEvent.click(button);

      expect(clickFN).toHaveBeenCalled();
    });
  });
});

describe('Given the Button component and width is provided in the props', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(Button, testProps);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should work click Button', () => {
      const { getByRole } = render(
        <ThemeProvider theme={darkNew}>
          <Button onClick={clickFN} />
        </ThemeProvider>,
      );

      const button = getByRole('button');
      fireEvent.click(button);

      expect(clickFN).toHaveBeenCalled();
    });
  });
});

describe('Given the Button component and width is not provided in the props', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(Button);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should work click Button', () => {
      const { getByRole } = render(
        <ThemeProvider theme={darkNew}>
          <Button onClick={clickFN} />
        </ThemeProvider>,
      );

      const button = getByRole('button');
      fireEvent.click(button);

      expect(clickFN).toHaveBeenCalled();
    });
  });
});

describe('Given the InvisibleButton component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(InvisibleButton);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should work click InvisibleButton', () => {
      const { getByRole } = render(
        <ThemeProvider theme={darkNew}>
          <InvisibleButton onClick={clickFN} />
        </ThemeProvider>,
      );

      const button = getByRole('button');
      fireEvent.click(button);

      expect(clickFN).toHaveBeenCalled();
    });
  });
});
