import { InjectedConnector } from '@web3-react/injected-connector';
// import { NetworkConnector } from "@web3-react/network-connector";
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { LedgerConnector } from '@web3-react/ledger-connector';

import { Networks } from '../utils';

/**

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  1: "https://mainnet.infura.io/v3/84842078b09946638c03157f83405213",
  4: "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213",
};

 */

const NETWORK_URL = 'https://mainnet.infura.io/v3/84842078b09946638c03157f83405213';

export const injected = new InjectedConnector({
  supportedChainIds: [
    Networks.MainNet, // Mainet
    Networks.Ropsten, // Ropsten
    Networks.Rinkeby, // Rinkeby
    Networks.Goerli, // Goerli
    Networks.Kovan, // Kovan
    Networks.Ganache, // Ganache Testnet
  ],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: NETWORK_URL },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 5000,
});

export const walletlink = new WalletLinkConnector({
  url: NETWORK_URL,
  appName: 'Uniswap',
  appLogoUrl:
    'https://mpng.pngfly.com/20181202/bex/kisspng-emoji-domain-unicorn-pin-badges-sticker-unicorn-tumblr-emoji-unicorn-iphoneemoji-5c046729264a77.5671679315437924251569.jpg',
});

export const ledgerConnect = new LedgerConnector({
  url: NETWORK_URL,
  chainId: 1,
});

export const SUPPORTED_WALLETS = {
  INJECTED: {
    connector: injected,
    name: 'Metamask',
    iconName: 'metamask.png',
    href: null,
    primary: true,
  },
  LEDGER: {
    connector: ledgerConnect,
    name: 'Ledger',
    iconName: 'leadger.png',
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'Wallet Connect',
    iconName: 'walletConnect.png',
    href: null,
  },
  COINBASE_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: 'coinbase.png',
    href: 'https://go.cb-w.com/mtUDhEZPy1',
    mobile: true,
    mobileOnly: true,
  },
};
