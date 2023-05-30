import { Request, Response, NextFunction } from "express";
import { User } from "../Models/Users";
import { HTTPStatusCode } from "../Utils/Errors/http.status.code";
import { APIMessage } from "../Utils/Errors/api.message";
import { ApiError } from "../Utils/Errors/ApiError";
import { errorType } from "../Utils/Errors/error.type";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.create(req.body);
    res
      .status(HTTPStatusCode.Created)
      .send({ data: user, mesage: `User ${APIMessage.CREATED}` });
  } catch (err) {
    err.name == "ValidationError"
      ? next(
          new ApiError(
            err.message,
            "Database validation failed",
            errorType.VALIDATION_ERROR,
            HTTPStatusCode.UnprocessableEntity
          )
        )
      : next(
          new ApiError(
            err.message,
            "Server error",
            errorType.INTERNAL_SERVER_ERROR,
            HTTPStatusCode.InternalServerError
          )
        );

    next(err);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find(req.query, { __v: 0 });
    console.log("inside get user");
    next(users);
  } catch (err) {
    res.status(HTTPStatusCode.UnprocessableEntity).send(err.message);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id, { __v: 0 });
    user
      ? res.status(HTTPStatusCode.OK).send(user)
      : res
          .status(HTTPStatusCode.NotFound)
          .send({ data: user, message: `User ${APIMessage.NOT_FOUND}` });
  } catch (err) {
    res.status(HTTPStatusCode.UnprocessableEntity).send(err.message);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log("usser is", user);
    user
      ? res
          .status(HTTPStatusCode.OK)
          .send({ data: user, message: `User ${APIMessage.UPDATED}` })
      : next(
          new ApiError(
            `User ${APIMessage.NOT_FOUND}`,
            "not found",
            APIMessage.NOT_FOUND,
            HTTPStatusCode.NotFound
          )
        );
  } catch (err) {
    res.status(HTTPStatusCode.UnprocessableEntity).send(err.message);
  }
};

export const updateMultiple = async (req: Request, res: Response) => {
  try {
    const result = await User.updateMany(req.query, req.body, {
      new: true,
      upsert: true,
    });
    res
      .status(HTTPStatusCode.OK)
      .send({ data: result, message: `Users ${APIMessage.UPDATED}` });
  } catch (err) {
    res.status(HTTPStatusCode.UnprocessableEntity).send(err.message);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    deletedUser
      ? res
          .status(HTTPStatusCode.OK)
          .send({ data: deletedUser, message: `User ${APIMessage.DELETED}` })
      : res
          .status(HTTPStatusCode.NotFound)
          .send({ data: deletedUser, message: `User ${APIMessage.NOT_FOUND}` });
  } catch (err) {
    res.status(HTTPStatusCode.UnprocessableEntity).send(err.message);
  }
};
