import { NextFunction, Request, Response } from "express";
import { ApiError } from "../Utils/Errors/ApiError.js";

export function errorHandler(error: ApiError, req: Request, res: Response) {
  res.status(error.httpCode).send({
    errorType: error.type,
    errorName: error.name,
    message: error.message,
  });
}
