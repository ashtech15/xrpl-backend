import "dotenv/config";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { SuccessResponse } from "../../utils/apiResponse.js";
import Logger from "../../middlewares/logger.js";
import * as ScenarioService from "./scenarioService.js";

/**** Get *****/
export const getTest: RequestHandler = async (_, res) => {
  const scenario = await ScenarioService.getTest();
  Logger.info("Logger getTest scenario");
  const response = new SuccessResponse(scenario);
  res.status(StatusCodes.OK).send(response);
};

export const getAccount: RequestHandler = async (req, res) => {
  const { address } = req.params;

  const account = await ScenarioService.getAccount(address);
  const response = new SuccessResponse(account);
  res.status(StatusCodes.OK).send(response);
};

export const getNfts: RequestHandler = async (req, res) => {
  const { address } = req.params;

  const nfts = await ScenarioService.getNfts(address);
  const response = new SuccessResponse(nfts);
  res.status(StatusCodes.OK).send(response);
};

export const getSellOffers: RequestHandler = async (req, res) => {
  const { tokenId } = req.params;

  const sellOffers = await ScenarioService.getSellOffers(tokenId);
  const response = new SuccessResponse(sellOffers);
  res.status(StatusCodes.OK).send(response);
};

export const getBuyOffers: RequestHandler = async (req, res) => {
  const { tokenId } = req.params;

  const buyOffers = await ScenarioService.getBuyOffers(tokenId);
  const response = new SuccessResponse(buyOffers);
  res.status(StatusCodes.OK).send(response);
};

export const decode: RequestHandler = async (req, res) => {
  const { uri } = req.params;

  const decoded = await ScenarioService.decode(uri);
  const response = new SuccessResponse(decoded);
  res.status(StatusCodes.OK).send(response);
};

/***** Post  *****/
export const fund: RequestHandler = async (req, res) => {
  const fundResult = await ScenarioService.fund();

  const response = new SuccessResponse(fundResult);
  res.status(StatusCodes.OK).send(response);
};

export const mint: RequestHandler = async (req, res) => {
  const { address, seed, uri } = req.body;

  const mintResult = await ScenarioService.mint(address, seed, uri);
  const response = new SuccessResponse(mintResult);
  res.status(StatusCodes.OK).send(response);
};

export const burn: RequestHandler = async (req, res) => {
  const { address, seed, tokenId } = req.body;

  const burnResult = await ScenarioService.burn(address, seed, tokenId);
  const response = new SuccessResponse(burnResult);
  res.status(StatusCodes.OK).send(response);
};

export const createSellOffer: RequestHandler = async (req, res) => {
  const { address, seed, tokenId, amount, destination } = req.body;

  const createSellOfferResult = await ScenarioService.createSellOffer(
    address,
    seed,
    tokenId,
    amount,
    destination,
  );
  const response = new SuccessResponse(createSellOfferResult);
  res.status(StatusCodes.OK).send(response);
};

export const acceptSellOffer: RequestHandler = async (req, res) => {
  const { address, seed, sellOffer } = req.body;

  const acceptSellOfferResult = await ScenarioService.acceptSellOffer(
    address,
    seed,
    sellOffer,
  );
  const response = new SuccessResponse(acceptSellOfferResult);
  res.status(StatusCodes.OK).send(response);
};

export const createBuyOffer: RequestHandler = async (req, res) => {
  const { address, seed, tokenId, owner, amount, destination } = req.body;

  const createBuyOfferResult = await ScenarioService.createBuyOffer(
    address,
    seed,
    tokenId,
    owner,
    amount,
    destination,
  );
  const response = new SuccessResponse(createBuyOfferResult);
  res.status(StatusCodes.OK).send(response);
};

export const acceptBuyOffer: RequestHandler = async (req, res) => {
  const { address, seed, buyOffer } = req.body;

  const acceptBuyOfferResult = await ScenarioService.acceptBuyOffer(
    address,
    seed,
    buyOffer,
  );
  const response = new SuccessResponse(acceptBuyOfferResult);
  res.status(StatusCodes.OK).send(response);
};

export const cancelOffers: RequestHandler = async (req, res) => {
  const { address, seed, offers } = req.body;

  const cancelOffersResult = await ScenarioService.cancelOffers(
    address,
    seed,
    offers,
  );
  const response = new SuccessResponse(cancelOffersResult);
  res.status(StatusCodes.OK).send(response);
};

/***** Scenarios *****/

export const scenarioOne: RequestHandler = async (req, res) => {
  const { uri } = req.body;

  console.log("Starting Scenario One with URI: ", uri);

  const platform = await ScenarioService.fund();
  console.log(
    "Platform Wallet created with Classic Address: ",
    platform.classicAddress,
  );
  const userA = await ScenarioService.fund();
  console.log(
    "User A Wallet created with Classic Address: ",
    userA.classicAddress,
  );
  const userB = await ScenarioService.fund();
  console.log(
    "User B Wallet created with Classic Address: ",
    userB.classicAddress,
  );

  const mintResult = await ScenarioService.mint(
    platform.classicAddress,
    platform.seed,
    uri,
  );

  const nfts = await ScenarioService.getNfts(platform.classicAddress);
  const nftTokenId = nfts[0].NFTokenID;

  console.log("Minted NFT with Token ID: ", nftTokenId);

  const createSellOfferResultA = await ScenarioService.createSellOffer(
    platform.classicAddress,
    platform.seed,
    nftTokenId,
    "0",
    userA.classicAddress,
  );

  const sellOfferA = await ScenarioService.getSellOffers(nftTokenId);

  console.log(
    "Created Sell Offer from Platform to User A with Index: ",
    sellOfferA.result.offers[0].nft_offer_index,
  );

  const acceptSellOfferResultA = await ScenarioService.acceptSellOffer(
    userA.classicAddress,
    userA.seed,
    sellOfferA.result.offers[0].nft_offer_index,
  );

  console.log(
    "Accepted Sell Offer from Platform to User A with Index: ",
    sellOfferA.result.offers[0].nft_offer_index,
  );

  const createSellOfferResultB = await ScenarioService.createSellOffer(
    userA.classicAddress,
    userA.seed,
    nftTokenId,
    "0",
    userB.classicAddress,
  );

  const sellOfferB = await ScenarioService.getSellOffers(nftTokenId);

  console.log(
    "Created Sell Offer from User A to User B with Index: ",
    sellOfferB.result.offers[0].nft_offer_index,
  );

  const acceptSellOfferResultB = await ScenarioService.acceptSellOffer(
    userB.classicAddress,
    userB.seed,
    sellOfferB.result.offers[0].nft_offer_index,
  );

  console.log(
    "Accepted Sell Offer from User A to User B with Index: ",
    sellOfferB.result.offers[0].nft_offer_index,
  );

  const createSellOfferResultC = await ScenarioService.createSellOffer(
    userB.classicAddress,
    userB.seed,
    nftTokenId,
    "0",
    platform.classicAddress,
  );

  const sellOfferC = await ScenarioService.getSellOffers(nftTokenId);

  console.log(
    "Created Sell Offer from User B to Platform with Index: ",
    sellOfferC.result.offers[0].nft_offer_index,
  );

  const acceptSellOfferResultC = await ScenarioService.acceptSellOffer(
    platform.classicAddress,
    platform.seed,
    sellOfferC.result.offers[0].nft_offer_index,
  );

  console.log(
    "Accepted Sell Offer from User B to Platform with Index: ",
    sellOfferC.result.offers[0].nft_offer_index,
  );

  const nftsPlatform = await ScenarioService.getNfts(platform.classicAddress);
  const decodedURI = await ScenarioService.decode(nftsPlatform[0].URI);

  console.log("Platform's NFT: ", nftsPlatform[0]);
  console.log("Platform's NFT URI: ", decodedURI);

  const response = new SuccessResponse({
    nft: nftsPlatform[0],
    uri: decodedURI,
  });
  res.status(StatusCodes.OK).send(response);
};

export const scenarioTwo: RequestHandler = async (req, res) => {
  const { uri } = req.body;

  console.log("Starting Scenario Two with URI: ", uri);

  const platform = await ScenarioService.fund();
  console.log(
    "Platform Wallet created with Classic Address: ",
    platform.classicAddress,
  );
  const userA = await ScenarioService.fund();
  console.log(
    "User A Wallet created with Classic Address: ",
    userA.classicAddress,
  );
  const userB = await ScenarioService.fund();
  console.log(
    "User B Wallet created with Classic Address: ",
    userB.classicAddress,
  );
  const notarizer = await ScenarioService.fund();
  console.log(
    "Notarizer Wallet created with Classic Address: ",
    userB.classicAddress,
  );

  const mintResult = await ScenarioService.mint(
    platform.classicAddress,
    platform.seed,
    uri,
  );

  const nfts = await ScenarioService.getNfts(platform.classicAddress);
  const nftTokenId = nfts[0].NFTokenID;

  console.log("Minted NFT with Token ID: ", nftTokenId);

  const createSellOfferResultA = await ScenarioService.createSellOffer(
    platform.classicAddress,
    platform.seed,
    nftTokenId,
    "100",
    userA.classicAddress,
  );

  const sellOfferA = await ScenarioService.getSellOffers(nftTokenId);

  console.log(
    "Created Sell Offer from Platform to User A with Index: ",
    sellOfferA.result.offers[0].nft_offer_index,
  );

  const acceptSellOfferResultA = await ScenarioService.acceptSellOffer(
    userA.classicAddress,
    userA.seed,
    sellOfferA.result.offers[0].nft_offer_index,
  );

  console.log(
    "Accepted Sell Offer from Platform to User A with Index: ",
    sellOfferA.result.offers[0].nft_offer_index,
  );

  const createSellOfferResultB = await ScenarioService.createSellOffer(
    userA.classicAddress,
    userA.seed,
    nftTokenId,
    "100",
    userB.classicAddress,
  );

  const sellOfferB = await ScenarioService.getSellOffers(nftTokenId);

  console.log(
    "Created Sell Offer from User A to User B with Index: ",
    sellOfferB.result.offers[0].nft_offer_index,
  );

  const acceptSellOfferResultB = await ScenarioService.acceptSellOffer(
    userB.classicAddress,
    userB.seed,
    sellOfferB.result.offers[0].nft_offer_index,
  );

  console.log(
    "Accepted Sell Offer from User A to User B with Index: ",
    sellOfferB.result.offers[0].nft_offer_index,
  );

  const createSellOfferResultC = await ScenarioService.createSellOffer(
    userB.classicAddress,
    userB.seed,
    nftTokenId,
    "100",
    platform.classicAddress,
  );

  const sellOfferC = await ScenarioService.getSellOffers(nftTokenId);

  console.log(
    "Created Sell Offer from User B to Platform with Index: ",
    sellOfferC.result.offers[0].nft_offer_index,
  );

  const acceptSellOfferResultC = await ScenarioService.acceptSellOffer(
    platform.classicAddress,
    platform.seed,
    sellOfferC.result.offers[0].nft_offer_index,
  );

  console.log(
    "Accepted Sell Offer from User B to Platform with Index: ",
    sellOfferC.result.offers[0].nft_offer_index,
  );

  const createSellOfferResultD = await ScenarioService.createSellOffer(
    platform.classicAddress,
    platform.seed,
    nftTokenId,
    "100",
    notarizer.classicAddress,
  );

  const sellOfferD = await ScenarioService.getSellOffers(nftTokenId);

  console.log(
    "Created Sell Offer from Platform to Notarizer with Index: ",
    sellOfferD.result.offers[0].nft_offer_index,
  );

  const acceptSellOfferResultD = await ScenarioService.acceptSellOffer(
    notarizer.classicAddress,
    notarizer.seed,
    sellOfferD.result.offers[0].nft_offer_index,
  );

  console.log(
    "Accepted Sell Offer from Platform to Notarizer with Index: ",
    sellOfferD.result.offers[0].nft_offer_index,
  );

  const nftNotarizer = await ScenarioService.getNfts(notarizer.classicAddress);
  const decodedURI = await ScenarioService.decode(nftNotarizer[0].URI);

  console.log("Notarizer's NFT: ", nftNotarizer[0]);
  console.log("Notarizer's NFT URI: ", decodedURI);

  const response = new SuccessResponse({
    nft: nftNotarizer[0],
    uri: decodedURI,
  });
  res.status(StatusCodes.OK).send(response);
};
