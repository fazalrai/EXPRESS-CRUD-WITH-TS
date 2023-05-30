import { Schema, model } from "mongoose";
import { User } from "./Users";
import { ApiError } from "../Utils/Errors/ApiError";
import { APIMessage } from "../Utils/Errors/api.message";
import { HTTPStatusCode } from "../Utils/Errors/http.status.code";

interface Book {
  name: string;
  user: object;
}

const bookScehma = new Schema<Book>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 10,
      index: { unique: true },
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

bookScehma.pre<Book>("save", async function (next) {
  const userIdIsValid = await User.findById(this.user);
  if (!userIdIsValid) {
    return next(
      new ApiError(
        "Usess not found",
        APIMessage.NOT_FOUND,
        APIMessage.NOT_FOUND,
        HTTPStatusCode.NotFound
      )
    );
  } else {
    next();
  }
});

export const Book = model<Book>("Book", bookScehma);
