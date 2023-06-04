"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import path from "path";
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const colors_1 = __importDefault(require("colors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
// import connectDB from "./config/db.js";
const errors_handling_middleware_1 = require("./middlewares/errors-handling.middleware");
const colors_palette_router_1 = __importDefault(require("./routes/colors-palette.router"));
const manga_comparator_router_1 = __importDefault(require("./routes/manga-comparator.router"));
const spotify_playlist_router_1 = __importDefault(require("./routes/spotify-playlist.router"));
dotenv_1.default.config();
const { PORT, NODE_ENV } = process.env;
// connectDB();
const port = PORT ?? 9999;
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
if (NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
    // Configure CORS options
    app.use((0, cors_1.default)({
        origin: "*"
    }));
}
else if (NODE_ENV === "production") {
    // Configure CORS options
    app.use((0, cors_1.default)({
        origin: "https://color-palette-generator-v0ah.onrender.com"
    }));
}
// Middlewares
app.use((req, res, next) => {
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});
// Mimic "__dirname" in ES Module nodeJS
// eslint-disable-next-line @typescript-eslint/naming-convention
// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/build")));
//   app.get("*", (req: Request, res: Response) => { res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")); }
//   );
// } else {
//   app.get("/", (req: Request, res: Response) => {
//     res.send("API is running...");
//   });
// }
console.log({ __dirname });
// app.use(express.static(path.join(
//   __dirname.replace("/dist", ""),
//   "/frontend",
//   "/colors",
//   "/public"
// )));
app.get("/", (req, res) => {
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
app.use("/v1/colors", colors_palette_router_1.default);
app.use("/v1/manga", manga_comparator_router_1.default);
app.use("/v1/spotify", spotify_playlist_router_1.default);
app.use(errors_handling_middleware_1.notFound);
app.use(errors_handling_middleware_1.errorHandler);
app.listen(port, () => { console.log(colors_1.default.yellow(`Server running in ${NODE_ENV ?? "development"} mode on port ${port}.`)); });
//# sourceMappingURL=server.js.map