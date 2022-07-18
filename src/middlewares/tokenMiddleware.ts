import { Request, Response, NextFunction } from "express";
import { verifySession } from "../repositories/sessionRepositories.js";
import jwt from "jsonwebtoken";

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    const token = authorization?.replace("Bearer ", "").trim();

    const secretKey = process.env.SECRET_KEY;

    if (!token) return res.status(401).send("Token not send");

    jwt.verify(token, secretKey || "Gambiarra :)", (err) => {
        if (err) return res.status(401).send("Invalid token");
    });

    const sessionValidate = await verifySession(token);

    res.locals.userId = {
        userId: sessionValidate?.id
    };

    next();
};