// import path from "path";
import express, { type Request, type Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
import cookieParser from "cookie-parser";
import cors from "cors";

import { errorHandler, notFound } from "./middlewares/errors-handling.middleware";

import colorsPaletteRouter from "./routes/colors-palette.router";
import mangaComparatorRouter from "./routes/manga-comparator.router";
import spotifyPlaylistRouter from "./routes/spotify-playlist.router";

dotenv.config();
const { PORT, NODE_ENV } = process.env;

const port = PORT ?? 9999;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS options with multiple allowed origins
const corsOptions = {
  origin: [
    "https://color-palette-generator-v0ah.onrender.com",
    "https://suppee.shop/general-chatgpt-server",
  ]
};

if (NODE_ENV === "development") {
  app.use(morgan("dev"));

  // Configure CORS options
  app.use(cors({
    origin: "*"
  }));
} else if (NODE_ENV === "production") {
  // Configure CORS options
  app.use(cors(corsOptions));
}

// Middlewares
app.use((req: Request, res: Response, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

// app.use(express.static(path.join(
//   __dirname.replace("/dist", ""),
//   "/frontend",
//   "/colors",
//   "/public"
// )));

app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

// app.get("/colors", (req: Request, res: Response) => {
//   res.sendFile(path.resolve(
//     __dirname.replace("/dist", ""),
//     "frontend",
//     "colors",
//     "public",
//     "index.html"
//   ));
// });

app.use("/v1/colors", colorsPaletteRouter);
app.use("/v1/manga", mangaComparatorRouter);
app.use("/v1/spotify", spotifyPlaylistRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(
  port,
  () => { console.log(colors.yellow(`Server running in ${NODE_ENV ?? "development"} mode on port ${port}.`)); }
);
