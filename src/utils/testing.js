import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import { dark } from 'Theme/theme';

export const renderWithTheme = (Component, props, children) => {
  if(children){
    return render(
      <ThemeProvider theme={ dark }>
        <Component { ...props }>
        {children}
        </Component>
    </ThemeProvider>)
  }
  return render(
  <ThemeProvider theme={ dark }>
    <Component { ...props } />
</ThemeProvider>)
};
