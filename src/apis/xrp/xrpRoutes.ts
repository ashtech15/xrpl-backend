import Router from "express";
import "express-async-errors";
import * as XrpController from "./xrpController.js";
import * as JoiValidator from "../../middlewares/joiValidator.js";
import * as XrpSchemas from "./xrpSchemas.js";

const xrpRoutes = Router();

// Get Routes
xrpRoutes.get(
  "/",
  JoiValidator.body(XrpSchemas.getTest),
  XrpController.getTest,
);
xrpRoutes.get(
  "/account/:address",
  JoiValidator.params(XrpSchemas.getAccount),
  XrpController.getAccount,
);
xrpRoutes.get(
  "/nfts/:address",
  JoiValidator.params(XrpSchemas.getNfts),
  XrpController.getNfts,
);
xrpRoutes.get(
  "/offer/sell/:tokenId",
  JoiValidator.params(XrpSchemas.getSellOffers),
  XrpController.getSellOffers,
);
xrpRoutes.get(
  "/decode/:uri",
  JoiValidator.params(XrpSchemas.decode),
  XrpController.decode,
);

// Post Routes
xrpRoutes.post("/fund", XrpController.fund);
xrpRoutes.post("/mint", JoiValidator.body(XrpSchemas.mint), XrpController.mint);
xrpRoutes.post("/burn", JoiValidator.body(XrpSchemas.burn), XrpController.burn);
xrpRoutes.post(
  "/offer/sell/create",
  JoiValidator.body(XrpSchemas.createSellOffer),
  XrpController.createSellOffer,
);
xrpRoutes.post(
  "/offer/sell/accept",
  JoiValidator.body(XrpSchemas.acceptSellOffer),
  XrpController.acceptSellOffer,
);

export default xrpRoutes;
