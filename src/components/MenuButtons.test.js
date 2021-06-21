import { cleanup, fireEvent } from '@testing-library/react';

import MenuButtons from './MenuButtons';
import { renderWithTheme } from '../utils/testing';

const testProps = {
  onButtonChange: jest.fn(),
  menuButtons: [
    {status: false, text:'button1'},
    {status: false, text:'button2'},
    {status: false, text:'button3'}
  ]
};

describe('Given the MenuButtons component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(MenuButtons, testProps);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should include required button titles', () => {
      const { getByText } = renderWithTheme(MenuButtons, testProps);
      expect(getByText('button1')).toBeInTheDocument();
      expect(getByText('button2')).toBeInTheDocument();
      expect(getByText('button3')).toBeInTheDocument();
    });

    describe('and user clicks on button', () => {
      it('should call onButtonChange function and change status of clicked button', async () => {
        const { getByText } = renderWithTheme(MenuButtons, testProps);
        let updatedMenuButtons = testProps.menuButtons.slice();
        updatedMenuButtons[2].status=true;

        fireEvent.click(getByText(testProps.menuButtons[2].text));
        expect(testProps.onButtonChange).toHaveBeenCalled();
        expect(testProps.onButtonChange).toHaveBeenCalledWith(updatedMenuButtons, "3");

      });
    });

    describe('and user clicks on all buttons', () => {
      it('should call onButtonChange function for all buttons', async () => {
        const { getByText } = renderWithTheme(MenuButtons, testProps);

        fireEvent.click(getByText(testProps.menuButtons[0].text));
        fireEvent.click(getByText(testProps.menuButtons[1].text));
        fireEvent.click(getByText(testProps.menuButtons[2].text));
        expect(testProps.onButtonChange).toHaveBeenCalledTimes(3);

      });
    });
  });
});
