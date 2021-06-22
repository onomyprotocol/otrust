import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

import Landing from '../pages/Landing';
import { useEagerConnect } from '../hooks/useEagerConnect';
import { useInactiveListener } from '../hooks/useInactiveListener';
import { Networks } from '../utils';

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    Networks.MainNet, // Mainet
    Networks.Ropsten, // Ropsten
    Networks.Rinkeby, // Rinkeby
    Networks.Goerli, // Goerli
    Networks.Kovan, // Kovan
    Networks.Ganache, // Ganache Testnet
  ],
});

export function AutoLogin({ children }) {
  const { activate, active, connector } = useWeb3React();

  const initWeb3 = () => {
    activate(injectedConnector);
  };

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // mount only once or face issues :P
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector);

  return <>{active ? children : <Landing initWeb3={initWeb3} />}</>;
}
