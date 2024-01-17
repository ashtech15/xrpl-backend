import "dotenv/config";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { SuccessResponse } from "../../utils/apiResponse.js";
import Logger from "../../middlewares/logger.js";
import * as XrpService from "./xrpService.js";

/**** Get *****/
export const getTest: RequestHandler = async (_, res) => {
  const xrp = await XrpService.getTest();
  Logger.info("Logger getTest xrp");
  const response = new SuccessResponse(xrp);
  res.status(StatusCodes.OK).send(response);
};

export const getAccount: RequestHandler = async (req, res) => {
  const { address } = req.params;

  const account = await XrpService.getAccount(address);
  const response = new SuccessResponse(account);
  res.status(StatusCodes.OK).send(response);
};

export const getNfts: RequestHandler = async (req, res) => {
  const { address } = req.params;

  const nfts = await XrpService.getNfts(address);
  const response = new SuccessResponse(nfts);
  res.status(StatusCodes.OK).send(response);
};

export const getSellOffers: RequestHandler = async (req, res) => {
  const { tokenId } = req.params;

  const sellOffers = await XrpService.getSellOffers(tokenId);
  const response = new SuccessResponse(sellOffers);
  res.status(StatusCodes.OK).send(response);
};

export const getAllSellOffers: RequestHandler = async (req, res) => {
  const { tokenIds, destination } = req.body;

  const allSellOffers = await XrpService.getAllSellOffers(
    tokenIds,
    destination,
  );
  const response = new SuccessResponse(allSellOffers);
  res.status(StatusCodes.OK).send(response);
};

export const getBuyOffers: RequestHandler = async (req, res) => {
  const { tokenId } = req.params;

  const buyOffers = await XrpService.getBuyOffers(tokenId);
  const response = new SuccessResponse(buyOffers);
  res.status(StatusCodes.OK).send(response);
};

export const decode: RequestHandler = async (req, res) => {
  const { uri } = req.params;

  const decoded = await XrpService.decode(uri);
  const response = new SuccessResponse(decoded);
  res.status(StatusCodes.OK).send(response);
};

/***** Post  *****/
export const fund: RequestHandler = async (req, res) => {
  const fundResult = await XrpService.fund();

  const response = new SuccessResponse(fundResult);
  res.status(StatusCodes.OK).send(response);
};

export const fundSetup: RequestHandler = async (req, res) => {
  const [platform, userA, userB] = await Promise.all([
    XrpService.fund(),
    XrpService.fund(),
    XrpService.fund(),
  ]);

  const response = new SuccessResponse({
    platform,
    userA,
    userB,
  });
  res.status(StatusCodes.OK).send(response);
};

export const mint: RequestHandler = async (req, res) => {
  const { address, seed, uri } = req.body;

  const mintResult = await XrpService.mint(address, seed, uri);
  const response = new SuccessResponse(mintResult);
  res.status(StatusCodes.OK).send(response);
};

export const burn: RequestHandler = async (req, res) => {
  const { address, seed, tokenId } = req.body;

  const burnResult = await XrpService.burn(address, seed, tokenId);
  const response = new SuccessResponse(burnResult);
  res.status(StatusCodes.OK).send(response);
};

export const createSellOffer: RequestHandler = async (req, res) => {
  const { address, seed, tokenId, amount, destination } = req.body;

  const createSellOfferResult = await XrpService.createSellOffer(
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

  const acceptSellOfferResult = await XrpService.acceptSellOffer(
    address,
    seed,
    sellOffer,
  );
  const response = new SuccessResponse(acceptSellOfferResult);
  res.status(StatusCodes.OK).send(response);
};

export const createBuyOffer: RequestHandler = async (req, res) => {
  const { address, seed, tokenId, owner, amount, destination } = req.body;

  const createBuyOfferResult = await XrpService.createBuyOffer(
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

  const acceptBuyOfferResult = await XrpService.acceptBuyOffer(
    address,
    seed,
    buyOffer,
  );
  const response = new SuccessResponse(acceptBuyOfferResult);
  res.status(StatusCodes.OK).send(response);
};

export const cancelOffers: RequestHandler = async (req, res) => {
  const { address, seed, offers } = req.body;

  const cancelOffersResult = await XrpService.cancelOffers(
    address,
    seed,
    offers,
  );
  const response = new SuccessResponse(cancelOffersResult);
  res.status(StatusCodes.OK).send(response);
};
