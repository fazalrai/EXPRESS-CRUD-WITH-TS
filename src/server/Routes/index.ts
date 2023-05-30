import express from "express";

const route = express();

import userRouter from "./User";
import BookRouter from "./Book";

route.use("/user", userRouter);
route.use("/book", BookRouter);

export default route;
