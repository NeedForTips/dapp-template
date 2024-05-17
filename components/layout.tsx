import Web3Provider from '@/context/web3Context';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Web3Provider>{children}</Web3Provider>;
}
