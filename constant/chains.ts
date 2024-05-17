const infuraKey = 'de6e66cb509c43e0897d062c93f15d9e';

export const mainnets = [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: `https://mainnet.infura.io/v3/${infuraKey}`,
    blockExplorerUrl: 'https://etherscan.io',
  },
  {
    id: '0x38',
    token: 'BNB',
    label: 'BNB Smart Chain Mainnet',
    rpcUrl: 'https://bsc-dataseed1.binance.org',
    blockExplorerUrl: 'https://bscscan.com',
  },
  {
    id: '0x89',
    token: 'MATIC',
    label: 'Polygon Mainnet',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorerUrl: 'https://polygonscan.com',
  },
];

export const testnets = [
  {
    id: 11155111,
    token: 'ETH',
    label: 'Sepolia Testnet',
    rpcUrl: `https://sepolia.infura.io/v3/${infuraKey}`,
    blockExplorerUrl: 'https://sepolia.etherscan.io',
  },
  {
    id: '0x61',
    token: 'BNB',
    label: 'BSC Testnet',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    blockExplorerUrl: 'https://testnet.bscscan.com',
  },
  {
    id: 80002,
    token: 'MATIC',
    label: 'Polygon Amoy Testnet',
    rpcUrl: 'https://rpc-amoy.polygon.technology',
    blockExplorerUrl: 'https://amoy.polygonscan.com',
  },
  {
    id: 2442,
    token: 'ETH',
    label: 'Polygon zkEVM Cardona Testnet',
    rpcUrl: 'https://etherscan.cardona.zkevm-rpc.com',
    blockExplorerUrl: 'https://cardona-zkevm.polygonscan.com',
  },
];
