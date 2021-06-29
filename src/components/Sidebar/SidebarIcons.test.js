import { cleanup, render } from '@testing-library/react';

import { CloseIcon, CogIcon, LogoutIcon, TwitterIcon, MediumIcon } from './SidebarIcons';

describe('Given the CloseIcon component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = render(<CloseIcon />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});

describe('Given the CogIcon component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = render(<CogIcon />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});

describe('Given the LogoutIcon component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = render(<LogoutIcon />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});

describe('Given the TwitterIcon component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = render(<TwitterIcon />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});

describe('Given the MediumIcon component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = render(<MediumIcon />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
