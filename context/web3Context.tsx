'use client';

import EVMWalletProvider from './EVMWalletContext';

export default function Web3Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EVMWalletProvider>{children}</EVMWalletProvider>;
}
