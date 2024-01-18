import "dotenv/config";
import xrpl from "xrpl";
import Logger from "../../middlewares/logger.js";

/***** GET *****/
export const getTest = async (): Promise<string> => {
  return "Hello world from /xrp";
};

export const getAccount = async (
  address: string,
): Promise<xrpl.AccountInfoResponse> => {
  const client = new xrpl.Client(process.env.XRPL_PROVIDER);
  await client.connect();

  const account_info = await client.request({
    command: "account_info",
    account: address,
  });
  Logger.info("account_info: " + JSON.stringify(account_info));

  await client.disconnect();

  return account_info;
};

export const getNfts = async (
  address: string,
): Promise<xrpl.AccountNFTsResponse> => {
  const client = new xrpl.Client(process.env.XRPL_PROVIDER);
  await client.connect();

  const nfts = await client.request({
    command: "account_nfts",
    account: address,
  });
  Logger.info("nfts: " + JSON.stringify(nfts));

  await client.disconnect();

  return nfts;
};

export const getSellOffers = async (
  tokenId: string,
): Promise<xrpl.NFTSellOffersResponse | null> => {
  const client = new xrpl.Client(process.env.XRPL_PROVIDER);

  try {
    await client.connect();

    const sellOffers = await client.request({
      command: "nft_sell_offers",
      nft_id: tokenId,
    });
    Logger.info("Sell Offers: " + JSON.stringify(sellOffers));

    return sellOffers;
  } catch (error) {
    return null;
  } finally {
    await client.disconnect();
  }
};

type allSellOffers = {
  nft_id: string;
  offers: xrpl.NFTOffer[];
}[];

export const getAllSellOffers = async (
  tokenIds: string[],
  destination: string,
): Promise<allSellOffers> => {
  const allSellOffers = (
    await Promise.all(
      tokenIds.map(async (tokenId) => {
        const sellOffers = await getSellOffers(tokenId);

        if (sellOffers === null) {
          return null;
        }

        const filteredOffers = sellOffers.result.offers.filter(
          (offer: { destination?: string }) =>
            offer.destination === destination,
        );

        if (filteredOffers.length === 0) {
          return null;
        }
        return { nft_id: tokenId, offers: filteredOffers };
      }),
    )
  ).filter((offer) => offer !== null);

  return allSellOffers;
};

export const getBuyOffers = async (
  tokenId: string,
): Promise<xrpl.NFTBuyOffersResponse> => {
  const client = new xrpl.Client(process.env.XRPL_PROVIDER);
  await client.connect();

  const buyOffers = await client.request({
    command: "nft_buy_offers",
    nft_id: tokenId,
  });
  Logger.info("Buy Offers: " + JSON.stringify(buyOffers));

  await client.disconnect();

  return buyOffers;
};

export const decode = async (uri: string): Promise<string> => {
  const decoded = xrpl.convertHexToString(uri);
  Logger.info("decoded: " + JSON.stringify(decoded));
  return decoded;
};

/***** POST *****/

type fundResult = {
  wallet: xrpl.Wallet;
  balance: number;
};

export const fund = async (): Promise<fundResult> => {
  const client = new xrpl.Client(process.env.XRPL_PROVIDER);
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
): Promise<xrpl.SubmitResponse> => {
  const client = new xrpl.Client(process.env.XRPL_PROVIDER);
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
): Promise<xrpl.SubmitResponse> => {
  const client = new xrpl.Client(process.env.XRPL_PROVIDER);
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
  amount: string,
  destination?: string,
): Promise<xrpl.SubmitResponse> => {
  const client = new xrpl.Client(process.env.XRPL_PROVIDER);
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
    Amount: amount,
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
): Promise<xrpl.SubmitResponse> => {
  const client = new xrpl.Client(process.env.XRPL_PROVIDER);
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

export const createBuyOffer = async (
  address: string,
  seed: string,
  tokenId: string,
  owner: string,
  amount: string,
  destination?: string,
): Promise<xrpl.SubmitResponse> => {
  const client = new xrpl.Client(process.env.XRPL_PROVIDER);
  await client.connect();

  const wallet = xrpl.Wallet.fromSeed(seed);
  const account_info = await getAccount(address);
  const currentSequence = account_info.result.account_data.Sequence;
  Logger.info("currentSequence: " + currentSequence);

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

export const acceptBuyOffer = async (
  address: string,
  seed: string,
  buyOffer: string,
): Promise<xrpl.SubmitResponse> => {
  const client = new xrpl.Client(process.env.XRPL_PROVIDER);
  await client.connect();

  const wallet = xrpl.Wallet.fromSeed(seed);
  const account_info = await getAccount(address);
  const currentSequence = account_info.result.account_data.Sequence;

  Logger.info("currentSequence: " + currentSequence);

  const transactionJson: any = {
    TransactionType: "NFTokenAcceptOffer",
    Account: address,
    Fee: "10",
    NFTokenBuyOffer: buyOffer,
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

export const cancelOffers = async (
  address: string,
  seed: string,
  offers: string,
): Promise<xrpl.SubmitResponse> => {
  const client = new xrpl.Client(process.env.XRPL_PROVIDER);
  await client.connect();

  const wallet = xrpl.Wallet.fromSeed(seed);
  const account_info = await getAccount(address);
  const currentSequence = account_info.result.account_data.Sequence;
  Logger.info("currentSequence: " + currentSequence);

  const transactionJson: any = {
    TransactionType: "NFTokenCancelOffer",
    Account: address,
    NFTokenOffers: offers,
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
