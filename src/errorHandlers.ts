import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export class NotFoundError extends Error {}

export const notFoundHandler = () => {
  throw new NotFoundError();
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(404).json({ errors: err.message });
    return;
  }
  if (err instanceof ZodError) {
    res.status(422).json({ errors: err.errors });
    return;
  }
  console.error(err);
  res.sendStatus(500);
};
