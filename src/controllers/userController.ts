import { Request, Response } from "express";
import * as userService from "../services/userServices.js";
import { createSession } from "../repositories/sessionRepositories.js";
import { insert } from "../repositories/userRespositorie.js";

interface Credentials {
    email: string;
    password: string;
}

export const newUserController = async (req: Request, res: Response) => {
    const newUserData: Credentials = req.body;

    const user = await userService.newUserService(newUserData);

    try {
        await insert(user);
        return res.status(201).send("Successfully created!");
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

export const signInController = async (req: Request, res: Response) => {
    const userData: Credentials = req.body;

    try {
        const session = await userService.signInService(userData);
        await createSession(session);
        return res.status(200).send(session.token);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};