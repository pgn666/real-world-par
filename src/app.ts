import express from "express";
import cors from "cors";
import {createArticlesRouter} from "./articles/api/articlesRouter";
import {errorHandler, notFoundHandler} from "./error/errorHandlers";
import {Config} from "./config";
import {createDb} from "./db";
import {articlesCompositionRoot} from "./articles/application/articlesCompositionRoot";

export const createApp = (config: Config) => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    const db = config.DATABASE_URL ? createDb(config.DATABASE_URL) : null;
    app.use(createArticlesRouter(articlesCompositionRoot(db)));

    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
};