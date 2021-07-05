import { cleanup, render } from '@testing-library/react';
import React from 'react';

import LoadingBar from './LoadingBar';
// import { renderWithContext } from '../../utils/testing';

const testProps = {
  progress: 50,
  height: 2,
  className: '',
  color: 'red',
  background: 'transparent',
  onLoaderFinished: jest.fn(),
  transitionTime: 300,
  loaderSpeed: 500,
  waitingTime: 1000,
  shadow: true,
};
const fakeRef = React.createRef();

describe.skip('Given the LoadingBar component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const div = document.createElement('div');
      const { asFragment } = render(<LoadingBar {...testProps} ref={fakeRef} />, div);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
