import express from "express";
import cors from "cors";
import morgan from "morgan";
import apiRouter from "./api/routes";
import bodyParser from "body-parser";
import { errorHandlers } from "./errors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(express.json());

app.use("/api", apiRouter);

app.use(errorHandlers);

export default app;
