const IS_TESTNET = process.env.NEXT_PUBLIC_IS_TESTNET === "true";

export interface AxelarBridgeConfig {
  /** Currently just via deposit address, future could be gateway contract call. */
  method: "deposit-address";
  /** Chains that can fungibly source this asset.
   *
   *  See this FigJam for axlUSDC case:
   *  https://www.figma.com/file/utRjpBIvD7sRm31vxif7hF/Bridge-Integration-Diagram?node-id=340%3A935
   */
  sourceChains: SourceChainConfig[];
  /** Default source chain to be selected. Defaults to first in `sourceChains` if left `undefined`. */
  defaultSourceChainId?: SourceChain;
  /** Ex: `uusdc`. NOTE: Will get currency info from `originCurrency` on the IBC balance (from registrar).
   *  See: https://docs.axelar.dev/resources/mainnet#assets
   */
}

/** Intermediate source chain identifiers */
export type SourceChain =
  | "aurora"
  | "avalanche"
  | "binance"
  | "ethereum"
  | "fantom"
  | "moonbeam"
  | "polygon";

/** Maps Axelar chain id agruments => source chain ids. 
 *  SourceChain (IDs) are used in ./source-chain-configs.ts::SourceChainConfigs{} as <asset>::<network>::id values.
 *  Axelar Chain IDs are accepted as arguments in Axelar's APIs.
 *  Mainnet Docs: https://docs.axelar.dev/dev/build/chain-names/mainnet
 *  Testnet Docs: https://docs.axelar.dev/dev/build/chain-names/testnet
 *  Testnet API: https://axelartest-lcd.quickapi.com/axelar/nexus/v1beta1/chains?status=1
 */
export const AxelarChainIds_SourceChainMap: {
  [axelarChainIds: string]: SourceChain;
} = IS_TESTNET ?
  {
    "aurora": "aurora",
    "Avalanche": "avalanche",
    "binance": "binance",
    "ethereum-2": "ethereum",
    "Fantom": "fantom",
    "Moonbeam": "moonbeam",
    "Polygon": "polygon"
  } :
  {
    "Avalanche": "avalanche",
    "binance": "binance",
    "Ethereum": "ethereum",
    "Fantom": "fantom",
    "Moonbeam": "moonbeam",
    "Polygon": "polygon"
  };

/** Maps eth client chain IDs => source chain ids.
 *
 *  ethClientChainIDs must be specified in ../ethereuem/types.ts::ChainNames{} to map the name to a chainID, which is in turn used to add the network to EVM-compatible wallets, like Metamask.
 *  SourceChain (IDs) are used in ./source-chain-configs.ts::SourceChainConfigs{} as <asset>::<network>::id values.
 */
export const EthClientChainIds_SourceChainMap: {
  [ethClientChainIds: string]: SourceChain;
} = IS_TESTNET ?
  {
    "Aurora Testnet": "aurora",
    "Avalanche Fuji Testnet": "avalanche",
    "Binance Smart Chain Testnet": "binance",
    "Goerli Test Network": "ethereum",
    "Fantom Testnet": "fantom",
    "Moonbase Alpha": "moonbeam",
    "Mumbai": "polygon",
  } : {
    "Avalanche C-Chain": "avalanche",
    "Binance Smart Chain Mainnet": "binance",
    "Ethereum Main Network": "ethereum",
    "Fantom Opera": "fantom",
    "Moonbeam Mainnet": "moonbeam",
    "Polygon Mainnet": "polygon",
  };

export type SourceChainConfig = {
  /** Source Chain identifier. */
  id: SourceChain;
  /** Address of origin ERC20 token for that origin chain.
   * Leave blank to prefer native ETH currency if `id` is not a Cosmos chain in `ChainInfo`.
   */
  erc20ContractAddress?: string;

  /** For IBC transfer from CosmosCounterparty<->via Axelar<->Osmosis */
  ibcConfig?: {
    /** on cosmos counterparty */
    sourceChannelId: string;
    /** on Axelar */
    destChannelId: string;
  };

  logoUrl: string;
  
  /** Amount of Axelar transfer fee in `originCurrency`.
  *  TODO: use `useTransferFeeQuery` should fees become dynamic and once APIs become production ready.
  *  See calculator tool on Axelar docs to get current fee constants: https://docs.axelar.dev/resources/mainnet#cross-chain-relayer-gas-fee.
  */
  transferFeeMinAmount: string;

  prettyName: string;

};