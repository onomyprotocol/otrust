import { createGlobalStyle } from 'styled-components';

import BebasNeueBold from 'assets/fonts/BebasNeueBold.ttf';
import BebasNeueBook from 'assets/fonts/BebasNeueBook.ttf';
import BebasNeueRegular from 'assets/fonts/BebasNeueRegular.ttf';
import { responsive } from './constants';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    position: relative;

    background: linear-gradient(135deg, #16161f, #06060f);

    color: ${props => props.theme.colors.textPrimary};
    font-size: 14px;
    font-family: 'Poppins', sans-serif;

    @media screen and (max-width: ${responsive.laptop}) {
      font-size: 12px;
    }
  }

  html, body {
    min-height: 100%;
  }

  button {
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  @font-face {
    font-family: 'Bebas Neue';
    font-weight: 300;
    src: url('${BebasNeueBook}') format("truetype");
  }

  @font-face {
    font-family: 'Bebas Neue';
    font-weight: 400;
    src: url('${BebasNeueRegular}') format('truetype');
  }

  @font-face {
    font-family: 'Bebas Neue';
    font-weight: 600;
    src: url('${BebasNeueBold}') format("truetype");
  }

  body {
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
