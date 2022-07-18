import { Request, Response, NextFunction } from "express";
import newUserSchema from "../schemas/userSchema.js";

export const bodyMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = newUserSchema.validate(req.body);

    if (error) return res.status(422);

    next();
};