import morgan, { StreamOptions } from "morgan";
import { Request } from "express";

import Logger from "./logger.js";

const stream: StreamOptions = {
  write: (message) => Logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

morgan.token("body", (req: Request) => {
  if (req?.body?.password) {
    return "body: " + JSON.stringify({ ...req?.body, password: "********" });
  } else if (req?.body) {
    return "body: " + JSON.stringify(req?.body);
  }
});

morgan.token("params", (req: Request) => {
  return "params: " + JSON.stringify(req?.params);
});

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms \n :params :body",
  { stream, skip },
);

export default morganMiddleware;
