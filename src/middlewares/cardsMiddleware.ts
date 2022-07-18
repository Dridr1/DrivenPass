import { Request, Response, NextFunction } from "express";
import newCardSchema from "../schemas/cardSchema.js";

export const newCardMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = newCardSchema.validate(req.body);

    if (error) {
        return res.status(422).send(`Unprocessable entity:\n ${error}`);
    }
    next();
};
