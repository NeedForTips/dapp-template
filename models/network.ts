export enum NetworkType {
    Ethereum = "ethereum",
    Binance = "binance",
    Polygon = "polygon",
    Tron = "tron"
}

export type NetworkBase = {
    chainType: NetworkType
    chainId: number
}

export type CryptoNetwork = NetworkBase & {
    name: string
    currencySymbol: string
    blockExplorerUrl: string
    rpcUrl: string
}

export type NetworkCurrency = {
    tokenType: string
    chainInfo: NetworkBase
    contractAddress: string
    symbol: string
    decimals: number
}