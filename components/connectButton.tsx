'use client';

import { useEVMWallet } from '@/context/EVMWalletContext';

export default function ConnectButton() {
  const [{ wallet, connecting }, { connect, disconnect }] = useEVMWallet();

  return (
    <button
      disabled={connecting}
      onClick={() => (wallet ? disconnect(wallet) : connect())}
    >
      {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
    </button>
  );
}
