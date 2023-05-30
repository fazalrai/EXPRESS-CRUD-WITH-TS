import express, { Express } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({ override: true }); //this is override any env set directly via console with .env file
const app: Express = express();
import connectDb from "./config/database.connection";
import route from "./Routes/index";
import { errorHandler } from "./Middleware/ErrorHandler";
connectDb();
const allowedOrigins = ["*"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(morgan("tiny"));
app.use(cors(options));
app.use(helmet());

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

app.use(route);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
