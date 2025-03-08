import { type Express, type Request, type Response } from "express";
import { errorHandler, notFound } from "../middlewares/errors-handling.middleware";
import colorsPaletteRouter from "../routes/colors-palette.router";
import mangaComparatorRouter from "../routes/manga-comparator.router";
import generalRouter from "../routes/general.router";
import stackConnectRouter from "../routes/stack-connect.router";

export const configureRoutes = (app: Express): void => {
  // Base route
  app.get("/", (req: Request, res: Response) => {
    res.send("API is running...");
  });

  // API routes
  app.use("/v1/general", generalRouter);
  app.use("/v1/colors", colorsPaletteRouter);
  app.use("/v1/manga", mangaComparatorRouter);
  app.use("/v1/stack-connect", stackConnectRouter);

  // Error handling
  app.use(notFound);
  app.use(errorHandler);
};
