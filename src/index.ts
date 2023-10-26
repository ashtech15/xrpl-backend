import "dotenv/config";
import express, { Request, Response } from "express";
import morganMiddleware from "./middlewares/morganMiddleware.js";
import Logger from "./middlewares/logger.js";
import exceptionHandler from "./middlewares/exceptionHandler.js";
import { StatusCodes } from "http-status-codes";
import xrpRoutes from "./apis/xrp/xrpRoutes.js";
import scenarioRoutes from "./apis/scenario/scenarioRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware for json
app.use(express.json({ limit: "20mb" }));

// Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// Morgan middleware with Winston
app.use(morganMiddleware);

// Routes
// prettier-ignore
app.use("/xrp", xrpRoutes);
// prettier-ignore
app.use("/scenario", scenarioRoutes);

// Define a route handler for the default home page
app.get("/", (_, res: Response) => {
  res.status(StatusCodes.OK).send("Hello world!");
});

// Route for logger test
app.get("/logger", (_, res: Response) => {
  Logger.error("This is an error log");
  Logger.warn("This is a warn log");
  Logger.info("This is a info log");
  Logger.http("This is a http log");
  Logger.debug("This is a debug log");
  res.send("Hello logger");
});

// Route for 404
app.all("*", (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).send("404: not found");
});

// Start the Express server, default port is 3000 if not stated in env
const httpServer = app.listen(PORT, () => {
  Logger.info(`Server started at http://localhost:${PORT}`);
});

process.on("SIGTERM", () => httpServer.close());
process.on("SIGINT", () => httpServer.close());

// Exception handler
app.use(exceptionHandler);
