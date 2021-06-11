import React from 'react';
import { render, act } from '@testing-library/react';

import App from './App';

describe('Given an App component', () => {
  describe('when the component is rendered', () => {
    let container;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    it('should match the snapshot', async () => {
      await act(async () => {
        render(<App />, container);
      });

      expect(container).toMatchSnapshot();
    });
  });
});
