import React, { useEffect } from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';

import Landing from '../pages/Landing';
import { useEagerConnect } from '../hooks/useEagerConnect';
import { useInactiveListener } from '../hooks/useInactiveListener';

export function AutoLogin({ children }) {
  const {
    activate,
    active,
    // account,
    connector,
  } = useWeb3React();

  const connectWallet = con => {
    try {
      activate(con, undefined, true).catch(error => {
        if (error instanceof UnsupportedChainIdError) {
          console.log(error);
          activate(connector); // a little janky...can't use setError because the connector isn't set
        } else {
          // setPendingError(true)
        }
      });
    } catch (error) {
      alert('Failed to connect.');
      console.log(error);
    }
  };

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState();

  useEffect(() => {
    console.log('activating connector: ', activatingConnector);
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // mount only once or face issues :P
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector);

  /**
    const connectKeplr = async () => {
      const chainId = "ochain-testnet";
      if(window.keplr) {
        await window.keplr.experimentalSuggestChain({
          // Chain-id of the Cosmos SDK chain.
          chainId: "ochain-testnet",
          // The name of the chain to be displayed to the user.
          chainName: "Onomy",
          // RPC endpoint of the chain.
          rpc: "http://64.227.98.168:26657",
          // REST endpoint of the chain.
          rest: "http://64.227.98.168:9091",
          stakeCurrency: {
            // Coin denomination to be displayed to the user.
            coinDenom: "NOM",
            // Actual denom (i.e. uatom, uscrt) used by the blockchain.
            coinMinimalDenom: "unom",
            // # of decimal points to convert minimal denomination to user-facing denomination.
            coinDecimals: 6,
            // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
            // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
            // coinGeckoId: ""
          },
          bip44: {
            coinType: 118,
          },
          bech32Config: {
            bech32PrefixAccAddr: "onomy",
            bech32PrefixAccPub: "onomypub",
            bech32PrefixValAddr: "onomyvaloper",
            bech32PrefixValPub: "onomyvaloperpub",
            bech32PrefixConsAddr: "onomyvalcons",
            bech32PrefixConsPub: "onomyvalconspub"
          },
          currencies: [{
            coinDenom: "NOM",
            coinMinimalDenom: "unom",
            coinDecimals: 6,
          }],
          feeCurrencies: [{
            coinDenom: "NOM",
            coinMinimalDenom: "unom",
            coinDecimals: 6,
          }],
          coinType: 118,
          gasPriceStep: {
            low: 0.01,
            average: 0.025,
            high: 0.04
          }
        });
          // Staking coin information
        await window.keplr.enable(chainId);
        // const offlineSigner = window.getOfflineSigner(chainId);
        // const accounts = await offlineSigner.getAccounts();
        // console.log(accounts)
      } else {
        alert('Install keplr chrome extension')
      }
    }
     */

  // const sendInKeplr = async (recipient, amount) => {
  //   // See above.
  //   const chainId = "cosmoshub-3";
  //   await window.keplr.enable(chainId);
  //   const offlineSigner = window.getOfflineSigner(chainId);

  //   const accounts = await offlineSigner.getAccounts();

  //   // Initialize the gaia api with the offline signer that is injected by Keplr extension.
  //   const cosmJS = new SigningCosmosClient(
  //       "https://node-cosmoshub-3.keplr.app/rest",
  //       accounts[0].address,
  //       offlineSigner
  //   );

  //   const result = await cosmJS.sendTokens(recipient, [{
  //       denom: "uatom",
  //       amount: amount.toString(),
  //   }]);

  //   console.log(result);

  //   if (result.code !== undefined &&
  //       result.code !== 0) {
  //       alert("Failed to send tx: " + result.log || result.rawLog);
  //   } else {
  //       alert("Succeed to send tx");
  //   }
  // }

  return <>{active ? children : <Landing connectWallet={connectWallet} />}</>;
}
