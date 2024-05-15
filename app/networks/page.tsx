export const runtime = 'edge';

import { CryptoNetwork } from "@/models/network";

async function getNetworks() {
  const res = await fetch(
    // 'https://bridge.api.alphacarbon.network/secure/bridge/public/chains',
    'https://banq.api.alphacarbon.network/secure/external/chains',
    { cache: 'no-store' }
  );
  const data = await res.json()
  return data as CryptoNetwork[]
}

export default async function NetworksPage() {
  const networks = await getNetworks()

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm px-5 py-4 lg:flex">
        <a
          href="../"
          className="group rounded-lg border border-transparent px-4 py-2 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h4 className={`font-semibold`}>
            <span className="inline-block transition-transform group-hover:-translate-x-1 motion-reduce:transform-none">
              &lt;-
            </span>
            {' '}Back
          </h4>
        </a>
      </div>
      <div className="z-10 text-center max-w-5xl w-full px-5">
        <h2 className={`mb-3 text-2xl font-semibold`}>Networks</h2>
      </div>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {networks?.map((network) => {
          return <Network key={`${network.chainType}-${network.chainId}`} network={network} />
        })}
      </div>
    </main>
  )
}

type NetworkProps = {
  key: string
  network: CryptoNetwork
}

function Network({network}: NetworkProps) {
  return (
    <a
      href={`/networks/${network.chainType}/${network.chainId}`}
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      <h3 className="mb-3 text-xl font-medium">{network.name}</h3>
      <h4 className="text-sm font-mono">{network.chainType}</h4>
      <h4 className="text-sm font-mono">{network.chainId}</h4>
      <h4 className="text-sm font-mono">{network.currencySymbol}</h4>
      <h4 className="text-sm font-mono">{network.blockExplorerUrl}</h4>
      <h4 className="text-sm font-mono">{network.rpcUrl}</h4>
    </a>
  )
}