import { Request, Response, NextFunction } from "express";
import newCredentialSchema from "../schemas/credentialSchema.js";

export const newCredentialMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = newCredentialSchema.validate(req.body);

    if (error) return res.status(422).send(`Unprocessable entity:\n ${error}`);

    next();
};
