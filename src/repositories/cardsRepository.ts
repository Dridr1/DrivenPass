import prisma from "../database.js";
import { cards } from "@prisma/client";
import { decrypt } from "../utils/ncrypt.js";

export type newCard = Omit<cards, "id" | "creatAt">;

export const insert = async (newCard: newCard) => await prisma.cards.create({ data: newCard });

export const verifyCards = async (title: string, userId: number) => {
    const cardInfos = await prisma.cards.findFirst({ where: { title: { equals: title, mode: "insensitive" }, userId: userId } });
    return cardInfos;
};

export const getAllCards = async (userId: number) => {
    const cards = await prisma.cards.findMany({ where: { userId: userId } });
    if (cards) {
        const cardsList = cards.map((card) => {
            const passwordDecrypted = decrypt(card.password);
            const cvcDecrypted = decrypt(card.cvc);
            return ({ ...card, password: passwordDecrypted, cvc: cvcDecrypted });
        });
        return cardsList;
    }
    return cards;
};

export const getCardById = async (id: number) => {
    const card = await prisma.cards.findFirst({ where: { id: id } });
    if (card) {
        const passwordDecrypted = decrypt(card.password);
        const cvcDecrypted = decrypt(card.cvc);
        return ({ ...card, password: passwordDecrypted, cvc: cvcDecrypted });
    }
    return card;
};

export const deleteCard = async (id: number) => await prisma.cards.delete({ where: { id: id } });