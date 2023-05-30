// import mongoose from "mongoose";
"useStrict";
import { Schema, model } from "mongoose";

interface User {
  name: string;
  age: number;
  timestamps: Date;
  address: string;
  email: string;
}

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      index: { unique: true },
    },
    age: { type: Number, required: true, unique: true },
    address: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const User = model<User>("User", userSchema);
