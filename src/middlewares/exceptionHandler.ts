import { Request, Response, NextFunction } from "express";

import Logger from "./logger.js";
import Exception from "./exception.js";
import { StatusCodes } from "http-status-codes";
import { FailureResponse } from "../utils/apiResponse.js";

const exceptionHandler = (
  err: Exception,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  Logger.error(
    `ExceptionHandler : [${err.message}] : ${JSON.stringify(err)} : ${
      err.stack
    }`,
  );
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // res.status(err?.status || 500);

  res
    .status(err?.status || StatusCodes.INTERNAL_SERVER_ERROR)
    .send(new FailureResponse(err, err.message));
};

export default exceptionHandler;
