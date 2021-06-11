import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';

import { dark } from 'Theme/theme';

export const renderWithTheme = (Component, rest) => {
  return render(
    <ThemeProvider theme={dark}>
      <Component {...rest} />
    </ThemeProvider>,
  );
};
