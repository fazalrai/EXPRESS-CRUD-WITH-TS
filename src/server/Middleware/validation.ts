// import { body, param } from 'express-validator';
import { object, string, number, Schema } from "yup";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../Utils/Errors/ApiError";
import { errorType } from "../Utils/Errors/error.type";
import { HTTPStatusCode } from "../Utils/Errors/http.status.code";

export const userSchema = object({
  name: string().required(),
  age: number().required(),
  email: string().email().required(),
  address: string().required(),
});

export const bookScehma = object({
  name: string().required().min(3).max(10),
  user: string().required(),
});

export const validates =
  (schema: Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const resource = req.body;
    try {
      await schema.validate(resource);
      next();
    } catch (err) {
      return next(
        new ApiError(
          err.errors,
          "Schema Validation failed",
          errorType.VALIDATION_ERROR,
          HTTPStatusCode.BadRequest
        )
      );
    }
  };
