import Router from "express";
import "express-async-errors";
import * as ScenarioController from "./scenarioController.js";
import * as JoiValidator from "../../middlewares/joiValidator.js";
import * as ScenarioSchemas from "./scenarioSchemas.js";

const scenarioRoutes = Router();

/***** GET Routes *****/
scenarioRoutes.get(
  "/",
  JoiValidator.body(ScenarioSchemas.getTest),
  ScenarioController.getTest,
);
scenarioRoutes.get(
  "/account/:address",
  JoiValidator.params(ScenarioSchemas.getAccount),
  ScenarioController.getAccount,
);
scenarioRoutes.get(
  "/nfts/:address",
  JoiValidator.params(ScenarioSchemas.getNfts),
  ScenarioController.getNfts,
);
scenarioRoutes.get(
  "/offer/sell/:tokenId",
  JoiValidator.params(ScenarioSchemas.getSellOffers),
  ScenarioController.getSellOffers,
);
scenarioRoutes.get(
  "/offer/buy/:tokenId",
  JoiValidator.params(ScenarioSchemas.getBuyOffers),
  ScenarioController.getBuyOffers,
);
scenarioRoutes.get(
  "/decode/:uri",
  JoiValidator.params(ScenarioSchemas.decode),
  ScenarioController.decode,
);

/***** POST Routes *****/
scenarioRoutes.post("/fund", ScenarioController.fund);
scenarioRoutes.post(
  "/mint",
  JoiValidator.body(ScenarioSchemas.mint),
  ScenarioController.mint,
);
scenarioRoutes.post(
  "/burn",
  JoiValidator.body(ScenarioSchemas.burn),
  ScenarioController.burn,
);
scenarioRoutes.post(
  "/offer/sell/create",
  JoiValidator.body(ScenarioSchemas.createSellOffer),
  ScenarioController.createSellOffer,
);
scenarioRoutes.post(
  "/offer/sell/accept",
  JoiValidator.body(ScenarioSchemas.acceptSellOffer),
  ScenarioController.acceptSellOffer,
);
scenarioRoutes.post(
  "/offer/buy/create",
  JoiValidator.body(ScenarioSchemas.createBuyOffer),
  ScenarioController.createBuyOffer,
);
scenarioRoutes.post(
  "/offer/buy/accept",
  JoiValidator.body(ScenarioSchemas.acceptBuyOffer),
  ScenarioController.acceptBuyOffer,
);
scenarioRoutes.post(
  "/offer/cancel",
  JoiValidator.body(ScenarioSchemas.cancelOffers),
  ScenarioController.cancelOffers,
);

scenarioRoutes.post("/one", ScenarioController.scenarioOne);
scenarioRoutes.post("/two", ScenarioController.scenarioTwo);

export default scenarioRoutes;
