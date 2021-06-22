import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { dark, light } from 'Theme/theme';
import { GlobalStyle } from 'Theme/GlobalStyle';
import { FullBackgroundContainer } from '../../components/UI/Container';
import landingImg from 'Assets/images/landing.svg';
import hLogo from 'Assets/images/hlogo.svg';

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function ThemePage({ setTheme }) {
  return (
    <FullBackgroundContainer img={landingImg}>
      <img src={hLogo} />
      <div style={{ marginTop: 40 }}>Welcome to Haven Social</div>
      <div style={{ margin: 10 }}>Please choose light or dark setting</div>
      <ButtonDiv>
        <button style={{ marginRight: 10 }} onClick={() => setTheme('light')}>
          light
        </button>
        <button style={{ marginLeft: 10 }} onClick={() => setTheme('dark')}>
          dark
        </button>
      </ButtonDiv>
    </FullBackgroundContainer>
  );
}

export function HavenTheme({ children }) {
  const [theme, updateTheme] = useState();
  const [trigger, updateTrigger] = useState(false);

  const setTheme = theme => {
    localStorage.setItem('theme', theme);
    if (theme == 'dark') {
      updateTheme(dark);
    } else {
      updateTheme(light);
    }
  };

  useEffect(() => {
    let themeStorage = localStorage.getItem('theme');

    if (themeStorage) {
      if (themeStorage == 'dark') {
        updateTheme(dark);
      } else {
        updateTheme(light);
      }
    } else updateTrigger(true);
  }, []);

  return theme ? (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  ) : trigger ? (
    <ThemePage setTheme={setTheme} trigger={trigger} data-testid="theme-page" />
  ) : null;
}
