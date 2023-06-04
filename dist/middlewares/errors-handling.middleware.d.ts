import { type NextFunction, type Request, type Response } from "express";
declare const notFound: (req: Request, res: Response, next: NextFunction) => void;
declare const errorHandler: (err: Error, req: Request, res: Response, next: NextFunction) => void;
export { notFound, errorHandler };
//# sourceMappingURL=errors-handling.middleware.d.ts.map