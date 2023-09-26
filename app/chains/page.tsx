type ChainConfig = {
  chainType: string
  chainId: number
  name: string
  currencySymbol: string
  blockExplorerUrl: string
  rpcUrl: string
}

async function getChains() {
  const res = await fetch(
    // 'https://bridge.api.alphacarbon.network/secure/bridge/public/chains',
    'https://banq.api.alphacarbon.network/secure/external/chains',
    { cache: 'no-store' }
  );
  const data = await res.json()
  return data as ChainConfig[]
}

export default async function ChainsPage() {
  const chains = await getChains()

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex px-5 py-4">
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
      <div className="z-10 max-w-5xl w-full px-5">
        <h2 className={`mb-3 text-2xl font-semibold`}>Chains</h2>
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
        {chains?.map((chain) => {
          return <Chain key={`${chain.chainType}-${chain.chainId}`} chain={chain} />
        })}
      </div>
    </main>
  )
}

type ChainProps = {
  key: string
  chain: ChainConfig
}

function Chain({chain}: ChainProps) {
  return (
    <a
      href={`/chains/${chain.chainType}/${chain.chainId}`}
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      <h3 className="mb-3 text-xl font-medium">{chain.name}</h3>
      <h4 className="text-sm font-mono">{chain.chainType}</h4>
      <h4 className="text-sm font-mono">{chain.chainId}</h4>
      <h4 className="text-sm font-mono">{chain.currencySymbol}</h4>
      <h4 className="text-sm font-mono">{chain.blockExplorerUrl}</h4>
      <h4 className="text-sm font-mono">{chain.rpcUrl}</h4>
    </a>
  )
}