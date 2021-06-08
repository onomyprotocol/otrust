import { ThemeProvider } from 'styled-components';
import MainHeader from 'components/MainHeader';
import BondingCurve from 'pages/BondingCurve';

import { darkNew } from 'theme/theme';
import { GlobalStyle } from 'theme/GlobalStyle';
import { AutoLogin } from 'context/AutoLogin';
import ChainProvider from 'context/chain/ChainContext';
import ExchangeProvider from 'context/exchange/ExchangeContext';
import ModalProvider from 'context/modal/ModalContext';

function App() {
  return (
    <ThemeProvider theme={darkNew}>
      <AutoLogin>
        <ChainProvider theme={darkNew}>
          <ExchangeProvider>
            <ModalProvider>
              <GlobalStyle />
              <MainHeader />
              <BondingCurve />
            </ModalProvider>
          </ExchangeProvider>
        </ChainProvider>
      </AutoLogin>
    </ThemeProvider>
  );
}

export default App;
