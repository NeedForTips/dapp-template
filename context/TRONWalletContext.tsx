'use client';

import { Context, createContext, useContext, useEffect, useState } from 'react';
import type {
  Adapter,
  AdapterName,
  WalletError,
} from '@tronweb3/tronwallet-abstract-adapter';
import {
  WalletDisconnectedError,
  WalletNotFoundError,
} from '@tronweb3/tronwallet-abstract-adapter';
import {
  useWallet,
  Wallet,
  WalletProvider,
} from '@tronweb3/tronwallet-adapter-react-hooks';
import { WalletModalProvider } from '@tronweb3/tronwallet-adapter-react-ui';
import '@tronweb3/tronwallet-adapter-react-ui/style.css';

function onError(e: WalletError) {
  if (e instanceof WalletNotFoundError) {
    console.log(e.message);
  } else if (e instanceof WalletDisconnectedError) {
    console.log(e.message);
  } else {
    console.log(e.message);
  }
}

export default function TRONWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [adapters, setAdapters] = useState<Adapter[]>([]);
  useEffect(() => {
    import('@tronweb3/tronwallet-adapters').then((res) => {
      const {
        BitKeepAdapter,
        OkxWalletAdapter,
        TokenPocketAdapter,
        TronLinkAdapter,
        WalletConnectAdapter,
        LedgerAdapter,
      } = res;
      const tronLinkAdapter = new TronLinkAdapter();
      const ledger = new LedgerAdapter({
        accountNumber: 2,
      });
      const walletConnectAdapter = new WalletConnectAdapter({
        network: 'Nile',
        options: {
          relayUrl: 'wss://relay.walletconnect.com',
          // example WC app project ID
          projectId: '5fc507d8fc7ae913fff0b8071c7df231',
          metadata: {
            name: 'Test DApp',
            description: 'JustLend WalletConnect',
            url: 'https://your-dapp-url.org/',
            icons: ['https://your-dapp-url.org/mainLogo.svg'],
          },
        },
        web3ModalConfig: {
          themeMode: 'dark',
          themeVariables: {
            '--w3m-z-index': '1000',
          },
        },
      });
      const bitKeepAdapter = new BitKeepAdapter();
      const tokenPocketAdapter = new TokenPocketAdapter();
      const okxwalletAdapter = new OkxWalletAdapter();
      setAdapters([
        tronLinkAdapter,
        bitKeepAdapter,
        tokenPocketAdapter,
        okxwalletAdapter,
        walletConnectAdapter,
        ledger,
      ]);
    });
  }, [setAdapters]);

  return (
    <WalletProvider
      onError={onError}
      adapters={adapters}
      disableAutoConnectOnLoad={true}
    >
      <WalletModalProvider>
        <InnerWalletProvider>{children}</InnerWalletProvider>
      </WalletModalProvider>
    </WalletProvider>
  );
}

interface Data {
  wallet: Wallet | null;
  connecting?: boolean;
}

interface Actions {
  select(adapterName: AdapterName): void;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

type ContextType = [Data, Actions];

const WalletContext = createContext<ContextType | null>(null);

function InnerWalletProvider({ children }: { children: React.ReactNode }) {
  const { connecting, wallet, select, connect, disconnect } = useWallet();

  return (
    <WalletContext.Provider
      value={[
        {
          wallet,
          connecting,
        },
        {
          select,
          connect,
          disconnect,
        },
      ]}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useTRONWallet() {
  const TRONWalletValue = useContext<ContextType>(
    WalletContext as Context<ContextType>
  );
  if (TRONWalletValue === undefined) {
    throw new Error('useTRONWallet must ber used within a WalletProvider');
  }

  return TRONWalletValue;
}
