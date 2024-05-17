'use client';

import { Context, createContext, useContext, useEffect, useState } from 'react';
import web3Onboard from '@/constant/web3Onboard';
import {
  Web3OnboardProvider,
  useConnectWallet,
  useWallets,
} from '@web3-onboard/react';
import type { ConnectOptions, WalletState } from '@web3-onboard/core';
import { reConnectWallets, updateWallets } from '@/utils/wallet';
import delay from '@/utils/delay';

export default function EVMWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <WalletProvider>{children}</WalletProvider>
    </Web3OnboardProvider>
  );
}

interface Data {
  wallet?: WalletState | null;
  connecting?: boolean;
}

interface Actions {
  connect: (options?: ConnectOptions) => Promise<WalletState[]>;
  disconnect: (wallet: WalletState) => Promise<WalletState[]>;
}

type ContextType = [Data, Actions];

interface TRONActions {
  connect?: () => void;
  disconnect?: () => void;
}

const WalletContext = createContext<ContextType | null>(null);

function WalletProvider({ children }: { children: React.ReactNode }) {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const connectedWallets = useWallets();
  const [walletInitialized, setWalletInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      // Wait for wallet providers to be injected.
      await delay(100);
      reConnectWallets(connect, () => setWalletInitialized(true));
    })();
  }, [connect]);

  useEffect(() => {
    if (!walletInitialized) return;

    updateWallets(connectedWallets);

    // Trigger connect when no wallet
    // if (!connectedWallets.length) {
    //   connect();
    // }
  }, [connectedWallets, walletInitialized]);

  return (
    <WalletContext.Provider
      value={[
        {
          wallet,
          connecting,
        },
        {
          connect,
          disconnect,
        },
      ]}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useEVMWallet() {
  const EVMWalletValue = useContext<ContextType>(
    WalletContext as Context<ContextType>
  );
  if (EVMWalletValue === undefined) {
    throw new Error('useEVMWallet must ber used within a WalletProvider');
  }

  return EVMWalletValue;
}
