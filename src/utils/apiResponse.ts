import Logger from "../middlewares/logger.js";

export abstract class ApiResponse {
  value: unknown;
  message: string;
  status: string;

  protected constructor(value: unknown, message?: string, status?: string) {
    this.status = status || "undefined";
    this.message = message || "undefined";
    this.value = value;
  }
}

export class FailureResponse extends ApiResponse {
  constructor(error: Error, message?: string) {
    Logger.error(error.message);
    super(null, message, "FAIL");
  }
}

export class SuccessResponse extends ApiResponse {
  constructor(value: unknown, message?: string) {
    super(value, message, "OK");
  }
}
