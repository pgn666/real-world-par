import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import { NotFoundError } from "./NotFoundError";
import { articleRouter } from "./articleRouter";

export const app = express();
app.use(cors());
app.use(express.json());

app.use(articleRouter);

app.use((req, res, next) => {
  throw new NotFoundError();
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(404).json({ errors: err.message });
    return;
  }
  console.error(err);
  res.sendStatus(500);
};
app.use(errorHandler);
