import { GasPrice } from "@cosmjs/stargate";

import env from "./env";

export interface Network {
  chainId: string;
  rpcEndpoint: string;
  prefix: string;
  gasPrice: GasPrice;
  feeToken: string;
}

export const oraiConfig: Network = {
  chainId: "Oraichain",
  rpcEndpoint: env.oraiRpcUrl,
  prefix: "orai",
  gasPrice: GasPrice.fromString("0.001orai"),
  feeToken: "orai",
};
