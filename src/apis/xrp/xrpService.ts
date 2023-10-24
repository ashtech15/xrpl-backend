import "dotenv/config";
import xrpl from "xrpl";
import Logger from "../../middlewares/logger.js";

/***** GET *****/
export const getTest = async (): Promise<string> => {
  return "Hello world from /xrp";
};

export const getAccount = async (address: string): Promise<any> => {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const account_info = await client.request({
    command: "account_info",
    account: address,
  });
  Logger.info("account_info: " + JSON.stringify(account_info));

  await client.disconnect();

  return account_info;
};

export const getNfts = async (address: string): Promise<any> => {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const nfts = await client.request({
    command: "account_nfts",
    account: address,
  });
  Logger.info("nfts: " + JSON.stringify(nfts));

  await client.disconnect();

  return nfts;
};

export const getSellOffers = async (tokenId: string): Promise<any> => {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const sellOffers = await client.request({
    command: "nft_sell_offers",
    nft_id: tokenId,
  });
  Logger.info("sellOffers: " + JSON.stringify(sellOffers));

  await client.disconnect();

  return sellOffers;
};

export const decode = async (uri: string): Promise<string> => {
  const decoded = xrpl.convertHexToString(uri);
  Logger.info("decoded: " + JSON.stringify(decoded));
  return decoded;
};

/***** POST *****/
export const fund = async (): Promise<any> => {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const fund_result = await client.fundWallet();
  const test_wallet = fund_result.wallet;
  Logger.info("fund_result: " + JSON.stringify(fund_result));
  Logger.info("test_wallet: " + JSON.stringify(test_wallet));

  await client.disconnect();

  return fund_result;
};

export const mint = async (
  address: string,
  seed: string,
  uri: string,
): Promise<any> => {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const wallet = xrpl.Wallet.fromSeed(seed);
  const account_info = await getAccount(address);
  const currentSequence = account_info.result.account_data.Sequence;
  Logger.info("currentSequence: " + currentSequence);

  const transactionJson: any = {
    TransactionType: "NFTokenMint",
    Account: address,
    URI: xrpl.convertStringToHex(uri),
    Flags: 8,
    TransferFee: 10,
    Fee: "10",
    NFTokenTaxon: 0,
    Sequence: currentSequence,
  };

  const signedTx = wallet.sign(transactionJson);
  Logger.info("signedTx: " + JSON.stringify(signedTx));

  const tx = await client.request({
    command: "submit",
    tx_blob: signedTx.tx_blob,
  });
  Logger.info("tx: " + JSON.stringify(tx));

  await client.disconnect();

  return tx;
};

export const burn = async (
  address: string,
  seed: string,
  tokenId: string,
): Promise<any> => {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const wallet = xrpl.Wallet.fromSeed(seed);
  const account_info = await getAccount(address);
  const currentSequence = account_info.result.account_data.Sequence;
  Logger.info("currentSequence: " + currentSequence);

  const transactionJson: any = {
    TransactionType: "NFTokenBurn",
    Account: address,
    NFTokenID: tokenId,
    Fee: "10",
    Sequence: currentSequence,
  };

  const signedTx = wallet.sign(transactionJson);
  Logger.info("signedTx: " + JSON.stringify(signedTx));

  const tx = await client.request({
    command: "submit",
    tx_blob: signedTx.tx_blob,
  });
  Logger.info("tx: " + JSON.stringify(tx));

  await client.disconnect();

  return tx;
};

export const createSellOffer = async (
  address: string,
  seed: string,
  tokenId: string,
  destination: string,
): Promise<any> => {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const wallet = xrpl.Wallet.fromSeed(seed);
  const account_info = await getAccount(address);
  const currentSequence = account_info.result.account_data.Sequence;
  Logger.info("currentSequence: " + currentSequence);

  const transactionJson: any = {
    TransactionType: "NFTokenCreateOffer",
    Account: address,
    NFTokenID: tokenId,
    Fee: "10",
    Amount: "0",
    Flags: 1,
    Destination: destination,
    Sequence: currentSequence,
  };

  const signedTx = wallet.sign(transactionJson);
  Logger.info("signedTx: " + JSON.stringify(signedTx));

  const tx = await client.request({
    command: "submit",
    tx_blob: signedTx.tx_blob,
  });
  Logger.info("tx: " + JSON.stringify(tx));

  await client.disconnect();

  return tx;
};

export const acceptSellOffer = async (
  address: string,
  seed: string,
  sellOffer: string,
): Promise<any> => {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const wallet = xrpl.Wallet.fromSeed(seed);
  const account_info = await getAccount(address);
  const currentSequence = account_info.result.account_data.Sequence;

  Logger.info("currentSequence: " + currentSequence);

  const transactionJson: any = {
    TransactionType: "NFTokenAcceptOffer",
    Account: address,
    Fee: "10",
    NFTokenSellOffer: sellOffer,
    Sequence: currentSequence,
  };

  const signedTx = wallet.sign(transactionJson);
  Logger.info("signedTx: " + JSON.stringify(signedTx));

  const tx = await client.request({
    command: "submit",
    tx_blob: signedTx.tx_blob,
  });
  Logger.info("tx: " + JSON.stringify(tx));

  await client.disconnect();

  return tx;
};
