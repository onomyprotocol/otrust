import { cleanup } from '@testing-library/react';

import LoadingSpinner from './LoadingSpinner';
import { AccentButton, Button, InvisibleButton } from './Button';
import { Container, FullBackgroundContainer } from './Container';
import { Panel } from './Panel';
import { ConnectionStatus } from './ConnectionStatus';
import { renderWithTheme } from '../../utils/testing';

const testProps = {
  width: 50,
};

describe('Given the AccentButton component and width is provided in the props', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(AccentButton, testProps);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});

describe('Given the AccentButton component and width is not provided in the props', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(AccentButton);
      expect(asFragment()).toMatchSnapshot();
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
  });
});

describe('Given the Button component and width is not provided in the props', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(Button);
      expect(asFragment()).toMatchSnapshot();
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
  });
});

describe('Given the Container component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(Container, undefined, 'Children');
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

describe('Given the LoadingSpinner component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(LoadingSpinner);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});

describe('Given the ConnectionStatus component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(ConnectionStatus);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});

describe('Given the Panel component', () => {
  describe('when the component is rendered', () => {
    afterEach(cleanup);

    it('should match the snapshot', () => {
      const { asFragment } = renderWithTheme(Panel);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
