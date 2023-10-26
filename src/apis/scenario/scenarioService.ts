import "dotenv/config";
import xrpl from "xrpl";
import inquirer from "inquirer";

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
  await client.disconnect();

  return nfts.result.account_nfts;
};

export const getSellOffers = async (tokenId: string): Promise<any> => {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const sellOffers = await client.request({
    command: "nft_sell_offers",
    nft_id: tokenId,
  });

  await client.disconnect();

  return sellOffers;
};

export const getBuyOffers = async (tokenId: string): Promise<any> => {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const buyOffers = await client.request({
    command: "nft_buy_offers",
    nft_id: tokenId,
  });

  await client.disconnect();

  return buyOffers;
};

export const decode = async (uri: string): Promise<string> => {
  const decoded = xrpl.convertHexToString(uri);
  return decoded;
};

/***** POST *****/

type FundResult = {
  publicKey: string;
  privateKey: string;
  classicAddress: string;
  seed?: string;
};

export const fund = async (): Promise<FundResult> => {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const fundResult = await client.fundWallet();
  const testWallet = fundResult.wallet;

  await client.disconnect();

  return testWallet;
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

  const transactionJson: xrpl.Transaction = {
    TransactionType: "NFTokenMint",
    Account: address,
    URI: xrpl.convertStringToHex(uri),
    Flags: 8,
    TransferFee: 10000,
    Fee: "10",
    NFTokenTaxon: 0,
    Sequence: currentSequence,
  };

  const signAnswer = await inquirer.prompt([
    {
      type: "confirm",
      name: "sign",
      message: "Sign transaction for minting nft? (y/n)",
    },
  ]);
  if (!signAnswer.sign) {
    throw new Error("Transaction not signed");
  }

  const signedTx = wallet.sign(transactionJson);

  const tx = await client.request({
    command: "submit",
    tx_blob: signedTx.tx_blob,
  });

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

  const transactionJson: any = {
    TransactionType: "NFTokenBurn",
    Account: address,
    NFTokenID: tokenId,
    Fee: "10",
    Sequence: currentSequence,
  };

  const signAnswer = await inquirer.prompt([
    {
      type: "confirm",
      name: "sign",
      message: "Sign transaction for burning? (y/n)",
    },
  ]);
  if (!signAnswer.sign) {
    throw new Error("Transaction not signed");
  }
  const signedTx = wallet.sign(transactionJson);

  const tx = await client.request({
    command: "submit",
    tx_blob: signedTx.tx_blob,
  });

  await client.disconnect();

  return tx;
};

export const createSellOffer = async (
  address: string,
  seed: string,
  tokenId: string,
  amount: string,
  destination?: string,
): Promise<any> => {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const wallet = xrpl.Wallet.fromSeed(seed);
  const account_info = await getAccount(address);
  const currentSequence = account_info.result.account_data.Sequence;

  const transactionJson: any = {
    TransactionType: "NFTokenCreateOffer",
    Account: address,
    NFTokenID: tokenId,
    Fee: "10",
    Amount: amount,
    Flags: 1,
    Destination: destination,
    Sequence: currentSequence,
  };

  const signAnswer = await inquirer.prompt([
    {
      type: "confirm",
      name: "sign",
      message: "Sign transaction for creating sell offer? (y/n)",
    },
  ]);
  if (!signAnswer.sign) {
    throw new Error("Transaction not signed");
  }
  const signedTx = wallet.sign(transactionJson);

  const tx = await client.request({
    command: "submit",
    tx_blob: signedTx.tx_blob,
  });

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

  const transactionJson: any = {
    TransactionType: "NFTokenAcceptOffer",
    Account: address,
    Fee: "10",
    NFTokenSellOffer: sellOffer,
    Sequence: currentSequence,
  };

  const signAnswer = await inquirer.prompt([
    {
      type: "confirm",
      name: "sign",
      message: "Sign transaction for accepting sell offer? (y/n)",
    },
  ]);
  if (!signAnswer.sign) {
    throw new Error("Transaction not signed");
  }
  const signedTx = wallet.sign(transactionJson);

  const tx = await client.request({
    command: "submit",
    tx_blob: signedTx.tx_blob,
  });

  await client.disconnect();

  return tx;
};

export const createBuyOffer = async (
  address: string,
  seed: string,
  tokenId: string,
  owner: string,
  amount: string,
  destination?: string,
): Promise<any> => {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const wallet = xrpl.Wallet.fromSeed(seed);
  const account_info = await getAccount(address);
  const currentSequence = account_info.result.account_data.Sequence;

  const transactionJson: any = {
    TransactionType: "NFTokenCreateOffer",
    Account: address,
    Owner: owner,
    NFTokenID: tokenId,
    Fee: "10",
    Amount: amount,
    Flags: null,
    Destination: destination,
    Sequence: currentSequence,
  };

  const signAnswer = await inquirer.prompt([
    {
      type: "confirm",
      name: "sign",
      message: "Sign transaction? (y/n)",
    },
  ]);
  if (!signAnswer.sign) {
    throw new Error("Transaction not signed");
  }
  const signedTx = wallet.sign(transactionJson);

  const tx = await client.request({
    command: "submit",
    tx_blob: signedTx.tx_blob,
  });

  await client.disconnect();

  return tx;
};

export const acceptBuyOffer = async (
  address: string,
  seed: string,
  buyOffer: string,
): Promise<any> => {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const wallet = xrpl.Wallet.fromSeed(seed);
  const account_info = await getAccount(address);
  const currentSequence = account_info.result.account_data.Sequence;

  const transactionJson: any = {
    TransactionType: "NFTokenAcceptOffer",
    Account: address,
    Fee: "10",
    NFTokenBuyOffer: buyOffer,
    Sequence: currentSequence,
  };

  const signAnswer = await inquirer.prompt([
    {
      type: "confirm",
      name: "sign",
      message: "Sign transaction? (y/n)",
    },
  ]);
  if (!signAnswer.sign) {
    throw new Error("Transaction not signed");
  }
  const signedTx = wallet.sign(transactionJson);

  const tx = await client.request({
    command: "submit",
    tx_blob: signedTx.tx_blob,
  });

  await client.disconnect();

  return tx;
};

export const cancelOffers = async (
  address: string,
  seed: string,
  offers: string,
): Promise<any> => {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const wallet = xrpl.Wallet.fromSeed(seed);
  const account_info = await getAccount(address);
  const currentSequence = account_info.result.account_data.Sequence;

  const transactionJson: any = {
    TransactionType: "NFTokenCancelOffer",
    Account: address,
    NFTokenOffers: offers,
    Fee: "10",
    Sequence: currentSequence,
  };

  const signAnswer = await inquirer.prompt([
    {
      type: "confirm",
      name: "sign",
      message: "Sign transaction? (y/n)",
    },
  ]);
  if (!signAnswer.sign) {
    throw new Error("Transaction not signed");
  }
  const signedTx = wallet.sign(transactionJson);

  const tx = await client.request({
    command: "submit",
    tx_blob: signedTx.tx_blob,
  });

  await client.disconnect();

  return tx;
};

/***** HELPER *****/
