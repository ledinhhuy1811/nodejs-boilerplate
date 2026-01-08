import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { makeCosmoshubPath } from "@cosmjs/amino";

import { oraiConfig } from "../configs/network";
import { decrypt } from "../utils/crypto";
import env from "../configs/env";
import logger from "../configs/logger";

// Use as global variable
export let cosmosClient: SigningCosmWasmClient;
export let cosmosAddress: string;

export const connectCosmosClient = async () => {
  const { prefix, gasPrice, feeToken, rpcEndpoint } = oraiConfig;
  const hdPath = makeCosmoshubPath(0);

  // decode to get mnemonic
  const mnemonic = decrypt(env.password, env.encryptedMnemonic);

  // Setup signer
  const offlineSigner = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix,
    hdPaths: [hdPath],
  });
  const { address } = (await offlineSigner.getAccounts())[0];
  logger.info(`Connected to ${address}`);

  // Init SigningCosmWasmClient client
  const client = await SigningCosmWasmClient.connectWithSigner(
    rpcEndpoint,
    offlineSigner,
    {
      gasPrice: gasPrice as any,
    }
  );

  const balance = await client.getBalance(address, feeToken);
  logger.info(`Balance: ${balance.amount} ${balance.denom}`);

  const chainId = await client.getChainId();
  logger.info(`Chain id: ${chainId}`);

  if (chainId !== oraiConfig.chainId) {
    throw Error("Given ChainId doesn't match the clients ChainID!");
  }

  // assign client and address
  cosmosClient = client;
  cosmosAddress = address;
};
