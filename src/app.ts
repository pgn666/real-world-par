import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import { errorHandler, NotFoundError, notFoundHandler } from "./NotFoundError";
import { articleRouter } from "./articleRouter";

export const app = express();
app.use(cors());
app.use(express.json());

app.use(articleRouter);

app.use(notFoundHandler);

app.use(errorHandler);
