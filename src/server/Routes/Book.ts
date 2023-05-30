import express from "express";
import { getBook, getBooks, createBook } from "../Controller/book";
const BookRouter = express.Router();

BookRouter.route("/").get(getBooks).post(createBook);
BookRouter.route("/:id").get(getBook);

export default BookRouter;
