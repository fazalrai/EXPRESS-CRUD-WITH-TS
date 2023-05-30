import { NextFunction, Request, Response } from "express";
import { Book } from "../Models/Books";
import { HTTPStatusCode } from "../Utils/Errors/http.status.code";
import { APIMessage } from "../Utils/Errors/api.message";
import { ApiError } from "../Utils/Errors/ApiError";
import { errorType } from "../Utils/Errors/error.type";
export const getBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id).populate("user");
    book
      ? res.status(HTTPStatusCode.Found).send(book)
      : res
          .status(HTTPStatusCode.NotFound)
          .send(`Book ${APIMessage.NOT_FOUND}`);
  } catch (err) {
    res.status(HTTPStatusCode.UnprocessableEntity).send(err.message);
  }
};
export const getBooks = async (req: Request, res: Response) => {
  try {
    const book = await Book.find(req.query);
    res.status(HTTPStatusCode.Found).send(book);
  } catch (err) {
    res.status(HTTPStatusCode.UnprocessableEntity).send(err.message);
  }
};

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = new Book(req.body);
    const result = await book.save();
    res
      .status(HTTPStatusCode.Created)
      .send({ data: result, mesage: `Book ${APIMessage.CREATED}` });
  } catch (err) {
    err.httpCode
      ? next(err)
      : next(
          new ApiError(
            err.message,
            "Server error",
            errorType.INTERNAL_SERVER_ERROR,
            HTTPStatusCode.InternalServerError
          )
        );
  }
};
