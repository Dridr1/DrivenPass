import { Request, Response } from "express";
import * as cardServices from "../services/cardServices.js";
import { deleteCard, insert } from "../repositories/cardsRepository.js";


export const newCardController = async (req: Request, res: Response) => {
    const card: cardServices.cardFormat = req.body;
    const { userId } = res.locals.userId;
    const cards = await cardServices.newCardService(card, userId);
    try {
        await insert(cards);
        return res.status(201).send("Card successfully registered");
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

export const getAllCardsController = async (req: Request, res: Response) => {
    const { userId } = res.locals.userId;
    const cards = await cardServices.verifyAllCards(userId);
    return res.status(200).send(cards);
};

export const getCardByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId }: { userId: number } = res.locals.userId;
    const idNum = parseInt(id);
    const card = await cardServices.verifyCardService(idNum, userId);
    return res.status(200).send(card);
};

export const deleteCardController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId }: { userId: number } = res.locals.userId;
    const idNum = parseInt(id);
    await cardServices.verifyCardService(idNum, userId);
    try {
        await deleteCard(idNum);
        return res.status(200).send("Card deleted");
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};