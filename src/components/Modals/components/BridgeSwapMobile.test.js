import { cleanup } from '@testing-library/react';
import ReactModal from 'react-modal';

import BridgeSwapMobile from './BridgeSwapMobile';
import { renderWithContext } from '../../../utils/testing';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
ReactModal.setAppElement(modalRoot);
document.body.appendChild(modalRoot);

describe('Given the BridgeSwapMobile component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithContext(BridgeSwapMobile);
      expect(asFragment()).toMatchSnapshot();
    });

    it.skip('should show swap Modal and do not show info Modal', () => {
      const { queryByTestId } = renderWithContext(BridgeSwapMobile);
      expect(queryByTestId('bridge-mobile-swap-modal')).toBeInTheDocument();
      expect(queryByTestId('bridge-mobile-info-modal')).not.toBeInTheDocument();
    });
  });
});
