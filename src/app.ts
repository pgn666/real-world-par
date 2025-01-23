import express from "express";
import cors from "cors";
import {articlesRouter} from "./articlesRouter";
import {errorHandlers, notFoundHandler} from "./errorHandlers";

export const app = express();
app.use(cors());
app.use(express.json());

app.use(articlesRouter);

app.use(notFoundHandler);
app.use(errorHandlers);
