import express, { type Request, type Response } from "express";

import { getManga, postManga } from "../controllers/manga-comparator.controller";

const router = express.Router();

// Middlewares
router.use((req: Request, res: Response, next) => {
  next();
});

router.get("/", getManga);
router.post("/", postManga);

export default router;
