import { type Request, type Response } from "express";
declare function getSomething(req: Request, res: Response): void;
declare function getColorsPalette(req: Request, res: Response): Promise<void>;
declare function postColorsPaletteTextCompletion(req: Request, res: Response): Promise<void>;
declare function postColorsPaletteChatCompletion(req: Request, res: Response): Promise<void>;
export { getSomething, getColorsPalette, postColorsPaletteTextCompletion, postColorsPaletteChatCompletion };
//# sourceMappingURL=colors-palette.controller.d.ts.map