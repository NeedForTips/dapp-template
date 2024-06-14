import { init } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import carbonWallet from './carbonWallet';
import { testnets } from './chains';

const injected = injectedModule({
  custom: [carbonWallet],
});

const wcInitOptions = {
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   * Account: mayone321@gmail.com
   */
  projectId: '2ee01401e3557fa12ac82ca9721cf23f',
  /**
   * Chains required to be supported by all wallets connecting to your DApp
   */
  requiredChains: [1],
  /**
   * Defaults to `appMetadata.explore` that is supplied to the web3-onboard init
   * Strongly recommended to provide atleast one URL as it is required by some wallets (i.e. MetaMask)
   * To connect with WalletConnect
   */
  dappUrl: 'https://dapp-template.pages.dev',
};
const walletConnect = walletConnectModule(wcInitOptions);

const wallets = [injected, walletConnect];

const web3Onboard = init({
  wallets: wallets,
  chains: testnets,
  appMetadata: {
    name: 'DApp Template',
    // #NOTE: DApp Icon in Account Center
    icon: '/next.svg',
    // #NOTE: DApp Logo in Onboard
    logo: '/next.svg',
    description: 'Welcome to DApp Template',
    // gettingStartedGuide?: string;
    // explore?: string;
    // /** When no injected wallets detected, recommend the user to install some*/
    recommendedInjectedWallets: [
      {
        name: 'MetaMask',
        url: 'https://metamask.io/',
      },
      {
        name: 'Carbon wallet',
        url: 'https://chrome.google.com/webstore/detail/carbon-wallet/pnphepacpjpklpbacfmebicbgndobakn',
      },
      {
        name: 'Coinbase Wallet',
        url: 'https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad',
      },
      {
        name: 'Binance Wallet',
        url: 'https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp',
      },
    ],
    // agreement?: TermsOfServiceAgreementOptions | null;
  },
  connect: {
    showSidebar: false,
    // autoConnectLastWallet: true,
  },
  accountCenter: {
    desktop: {
      enabled: true,
      position: 'topRight',
    },
    mobile: {
      enabled: true,
      position: 'topRight',
    },
  },
  theme: 'system',
});

export default web3Onboard;
