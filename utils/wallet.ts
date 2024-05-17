import type { ConnectOptions, WalletState } from '@web3-onboard/core';

export const updateWallets = (connectedWallets: WalletState[]) => {
  const connectedWalletsLabelArray = connectedWallets.map(({ label }) => label);
  window.localStorage.setItem(
    'connectedWallets',
    JSON.stringify(connectedWalletsLabelArray)
  );
};

export const reConnectWallets = async (
  connect: (options?: ConnectOptions) => Promise<WalletState[]>,
  onComplete?: () => void
) => {
  const prevConnectedWalletsStr =
    window.localStorage.getItem('connectedWallets');
  const prevConnectedWallets = prevConnectedWalletsStr
    ? JSON.parse(prevConnectedWalletsStr)
    : null;

  if (prevConnectedWallets?.length) {
    for (const walletLabel of prevConnectedWallets.reverse()) {
      await connect({
        autoSelect: {
          label: walletLabel,
          disableModals: true,
        },
      });
    }
  }

  onComplete && onComplete();
};
