import Joi from "joi";

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
  amount: Joi.string().required(),
  destination: Joi.string().required(),
});

export const acceptSellOffer = Joi.object({
  address: Joi.string().required(),
  seed: Joi.string().required(),
  sellOffer: Joi.string().required(),
});

export const createBuyOffer = Joi.object({
  address: Joi.string().required(),
  seed: Joi.string().required(),
  tokenId: Joi.string().required(),
  owner: Joi.string().required(),
  amount: Joi.string().required(),
  destination: Joi.string().required(),
});

export const acceptBuyOffer = Joi.object({
  address: Joi.string().required(),
  seed: Joi.string().required(),
  buyOffer: Joi.string().required(),
});

export const cancelOffers = Joi.object({
  address: Joi.string().required(),
  seed: Joi.string().required(),
  offers: Joi.array().items(Joi.string()).required(),
});

export const getSellOffers = Joi.object({
  tokenId: Joi.string().required(),
});

export const getAllSellOffers = Joi.object({
  tokenIds: Joi.array().items(Joi.string()).required(),
  destination: Joi.string().required(),
});

export const getBuyOffers = Joi.object({
  tokenId: Joi.string().required(),
});

export const decode = Joi.object({
  uri: Joi.string().required(),
});
