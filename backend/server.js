import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const port = process.env.PORT || 7777;

app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}.`.yellow
  )
);