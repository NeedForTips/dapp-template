'use client';

import EVMWalletProvider from './EVMWalletContext';
import TRONWalletProvider from './TRONWalletContext';

export default function Web3Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EVMWalletProvider>
      <TRONWalletProvider>{children}</TRONWalletProvider>
    </EVMWalletProvider>
  );
}
