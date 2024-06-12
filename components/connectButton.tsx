'use client';

import { useEVMWallet } from '@/context/EVMWalletContext';
import { WalletActionButton } from '@tronweb3/tronwallet-adapter-react-ui';

export default function ConnectButton() {
  const [{ wallet, connecting }, { connect, disconnect }] = useEVMWallet();

  return (
    <button
      className="rounded border border-transparent px-5 py-3 transition-colors hover:bg-gray-100 hover:dark:bg-gray-700"
      disabled={connecting}
      onClick={() => (wallet ? disconnect(wallet) : connect())}
    >
      <h4 className={`text-base font-semibold`}>
        {connecting ? 'connecting' : wallet ? 'disconnect' : 'Select Wallet'}
      </h4>
    </button>
  );
}

export { WalletActionButton };
