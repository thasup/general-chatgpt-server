import { type Request, type Response } from "express";

function getSomething (req: Request, res: Response): void {
  res.send("Hello! This is general API :D");
}

export {
  getSomething
};
