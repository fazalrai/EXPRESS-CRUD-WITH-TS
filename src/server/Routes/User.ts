import express from "express";
import { userSchema, validates } from "../Middleware/validation";
import {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  updateMultiple,
} from "../Controller/user";

const userRouter = express.Router();

userRouter
  .route("/")
  .get(getAllUsers)
  .post(validates(userSchema), createUser)
  .put(updateMultiple);

userRouter.route("/:id").get(getUser).delete(deleteUser).put(updateUser);

export default userRouter;
