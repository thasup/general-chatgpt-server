import express, { type Request, type Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";

import { errorHandler, notFound } from "./middlewares/errors-handling.middleware";

import colorsPaletteRouter from "./routes/colors-palette.router";
import mangaComparatorRouter from "./routes/manga-comparator.router";
import spotifyPlaylistRouter from "./routes/spotify-playlist.router";

dotenv.config();
const { PORT, NODE_ENV } = process.env;


const port = PORT ?? 7777;
const app = express();

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use((req: Request, res: Response, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

app.get("/", async (req: Request, res: Response) => {
  res.send("API is running...");
});
app.use("/v1/colors", colorsPaletteRouter);
app.use("/v1/manga", mangaComparatorRouter);
app.use("/v1/spotify", spotifyPlaylistRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(
  port,
  () => { console.log(colors.yellow(`Server running in ${NODE_ENV ?? "development"} mode on port ${port}.`)); }
);
