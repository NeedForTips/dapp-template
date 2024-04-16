export const runtime = 'edge';

import { NetworkBase, NetworkCurrency, NetworkType } from "@/models/network";

async function getTokens(network: NetworkBase) {
  const res = await fetch(
    // 'https://bridge.api.alphacarbon.network/secure/bridge/public/tokens',
    'https://banq.api.alphacarbon.network/secure/external/tokens',
    { cache: 'no-store' }
  )
  const data = await res.json() as { [symbol: string]: NetworkCurrency[] }
  return Object.values(data)
    .reduce((prev, current) => {
      return [...prev, ...current]
    }, [])
    .filter((token) =>
      token.chainInfo.chainType === network.chainType && token.chainInfo.chainId === network.chainId
    )
}

type NetworkPageProps = {
  params: {
    slug: string[]
  }
}

export default async function NetworkPage({ params }: NetworkPageProps) {
  const network = {chainType: params.slug[0] as NetworkType, chainId: Number(params.slug[1])}
  const tokens = await getTokens(network)

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
      <div className="z-10 text-center max-w-5xl w-full px-5">
        <h2 className={`mb-3 text-2xl font-semibold`}>Tokens</h2>
      </div>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {tokens?.map((token) => {
          return <Token key={token.tokenType} token={token} />
        })}
      </div>
    </main>
  )
}

type TokenProps = {
  key: string
  token: NetworkCurrency
}

function Token({token}: TokenProps) {
  return (
    <div
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      <h3 className="mb-3 text-xl font-medium">{token.tokenType}</h3>
      <h4 className="text-sm font-mono">{token.contractAddress}</h4>
      <h4 className="text-sm font-mono">{token.symbol}</h4>
      <h4 className="text-sm font-mono">{token.decimals}</h4>
    </div>
  )
}