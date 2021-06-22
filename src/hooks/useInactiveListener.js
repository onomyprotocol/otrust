import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import { injected } from '../connectors';

export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React();

  useEffect(() => {
    if (suppress) {
      return () => {};
    }
    const { ethereum } = window;
    if (ethereum && ethereum.on && !active && !error) {
      const handleConnect = () => {
        console.log("Handling 'connect' event");
        activate(injected);
      };

      const handleChainChanged = () => {
        activate(injected);
      };

      const handleAccountsChanged = accounts => {
        if (accounts.length > 0) {
          activate(injected);
        }
      };

      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }

    return () => {};
  }, [active, error, suppress, activate]);
}
