import { ThemeProvider } from 'styled-components'

import { darkNew } from 'theme/theme'
import { GlobalStyle } from 'theme/GlobalStyle'
import MainHeader from 'components/MainHeader'
import { AutoLogin } from 'context/AutoLogin'
import ChainProvider from 'context/chain/ChainContext'
import ModalProvider from 'context/ModalContext'
import BondingCurve from 'pages/BondingCurve'


function App() {
  return (
    <ThemeProvider theme={darkNew}>
      <AutoLogin>
        <ChainProvider theme={darkNew}>
          <ModalProvider>
            <GlobalStyle />
            <MainHeader />
            <BondingCurve />
          </ModalProvider >
        </ChainProvider>
      </AutoLogin>
    </ThemeProvider>
  );
}

export default App;
