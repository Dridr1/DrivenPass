import { Request, Response } from "express";
import * as credentialServices from "../services/credentialsServices.js";
import { insert, deleteCredential } from "../repositories/credentialsRepository.js";

export const newCredentialController = async (req: Request, res: Response) => {
    const { title, username, url, password } : { title: string, username: string, url: string, password: string } = req.body;
    const { userId } = res.locals.userId;
    try {
        const credential = await credentialServices.newCredentialService(title, password, username, url, userId);
        await insert(credential);
        return res.status(201).send("Credential successfully registered");
    } catch(error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

export const getAllCredentialsController = async (req: Request, res: Response) => {
    const { userId } = res.locals.userId;
    const credentials = await credentialServices.verifyAllCredentials(userId);
    return res.status(200).send(credentials);
};

export const getCredentialByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } : { userId: number } = res.locals.userId;
    const idNum = parseInt(id);
    const credential = await credentialServices.verifyCredentialService(idNum, userId);
    return res.status(200).send(credential);
};

export const deleteCredentialController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } : { userId: number } = res.locals.userId;
    const idNum = parseInt(id);
    await credentialServices.verifyCredentialService(idNum, userId);
    try {
        await deleteCredential(idNum);
        return res.status(200).send("Credential deleted");
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};