import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { FailureResponse } from "../utils/apiResponse.js";
import joi from "joi";

export const body = (schema: joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const response = new FailureResponse(error, error.details[0].message);
      return res.status(StatusCodes.BAD_REQUEST).send(response);
    }
    next();
  };
};

export const params = (schema: joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params);
    if (error) {
      const response = new FailureResponse(error, error.details[0].message);
      return res.status(StatusCodes.BAD_REQUEST).send(response);
    }
    next();
  };
};
