import Joi from "joi";
import { eoaValidation } from "../../utils/customValidation.js";

export const getTest = Joi.object({
  exampleKeyRequired: Joi.string().required(),
  exampleKeyNotRequired: Joi.string().allow(""),
});

export const getAccount = Joi.object({
  address: Joi.string().required(),
});

export const getNfts = Joi.object({
  address: Joi.string().required(),
});

export const mint = Joi.object({
  address: Joi.string().required(),
  seed: Joi.string().required(),
  uri: Joi.string().required(),
});

export const burn = Joi.object({
  address: Joi.string().required(),
  seed: Joi.string().required(),
  tokenId: Joi.string().required(),
});

export const createSellOffer = Joi.object({
  address: Joi.string().required(),
  seed: Joi.string().required(),
  tokenId: Joi.string().required(),
  destination: Joi.string().required(),
});

export const acceptSellOffer = Joi.object({
  address: Joi.string().required(),
  seed: Joi.string().required(),
  sellOffer: Joi.string().required(),
});

export const getSellOffers = Joi.object({
  tokenId: Joi.string().required(),
});

export const decode = Joi.object({
  uri: Joi.string().required(),
});
